import CameraIcon from "@/assets/icons/CameraIcon";
import TrashIcon from "@/assets/icons/TrashIcon";
import UniversalButton from "@/components/ui/UniversalButton";
import { globalStyles } from "@/styles/global";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  FlatList,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LocationIcon from "@/assets/icons/LocationIcon";
import Input from "@/components/ui/Input";
import StylizedButton from "@/components/ui/StylizedButton";
import { CreatePostFormData } from "@/data/types";
import { useNavigation } from "@react-navigation/native";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";

const CreatePostScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  // Camera permissions
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);

  //
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [locationHint, setLocationHint] =
    useState<Location.LocationGeocodedAddress[]>();

  const [title, setTitle] = useState("");
  const [imageLocation, setLocation] = useState("");
  const [image, setImage] = useState("");

  const [canPublish, setCanPublish] = useState(false);
  const [isTrashActive, setTrashActive] = useState(false);

  const handleClickMakePhoto = async () => {
    if (!permission || permission.status !== "granted") {
      await requestPermission();
      return;
    }

    await takePhoto();
  };

  const takePhoto = async () => {
    if (image) {
      setImage("");
    }

    cameraRef.current
      ?.takePictureAsync()
      .then((data) => {
        if (data) {
          return MediaLibrary.saveToLibraryAsync(data.uri).then(() => data);
        }
      })
      .then((data) => {
        if (data) {
          setImage(data.uri);
        }
      })
      .catch((error) => {
        console.error("Error taking photo: ", error);
      })
      .finally(() => {
        console.log("Photo process completed");
      });
  };

  useEffect(() => {
    if (title && imageLocation && image) {
      setCanPublish(true);
      setTrashActive(true);
    } else if (title || imageLocation || image) {
      setTrashActive(true);
      setCanPublish(false);
    } else {
      setTrashActive(false);
      setCanPublish(false);
    }
  }, [title, imageLocation, image]);

  ///Get current location when image is taken
  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      let tempAddress = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (image && imageLocation === "") {
        setLocation(`${tempAddress[0].region}, ${tempAddress[0].country}`);
      }
    }

    getCurrentLocation();
  }, [image]);

  const handleTrashPress = () => {
    setImage("");
    setTitle("");
    setLocation("");
  };

  const handleImageLocationTextChange = (text: string) => {
    setLocation(text);
    getHints(text);
  };

  const getHints = async (textLocation: string) => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }
    if (textLocation.length < 3) {
      return;
    }

    let tempLocation = await Location.geocodeAsync(textLocation);
    let tempHints = await Location.reverseGeocodeAsync({
      latitude: tempLocation[0].latitude,
      longitude: tempLocation[0].longitude,
    });

    setLocationHint(tempHints);
  };

  const handlePublishPress = () => {
    setImage("");
    setTitle("");
    setLocation("");

    navigation.navigate("posts");
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContent}>
        <View style={styles.imageContainer}>
          <View style={styles.image}>
            {!image ? (
              <CameraView style={styles.imageCamera} ref={cameraRef} />
            ) : (
              <Image source={{ uri: image }} style={styles.imageCamera} />
            )}
          </View>
          <UniversalButton
            onPress={handleClickMakePhoto}
            style={[
              styles.imageButton,
              image || permission?.status === "granted"
                ? styles.imageLoaded
                : {},
            ]}
          >
            <CameraIcon
              strokeColor={
                image || permission?.status === "granted"
                  ? globalStyles.colors.white
                  : globalStyles.colors.regularGray
              }
              fillColor={
                image || permission?.status === "granted"
                  ? globalStyles.colors.white
                  : globalStyles.colors.regularGray
              }
            />
          </UniversalButton>
        </View>
        <Text style={[styles.imageText]}>
          {image ? "Редагувати фото" : "Завантажте фото"}
        </Text>
      </View>
      <View style={styles.inputsContent}>
        <Input placeholder="Назва..." onTextChanged={setTitle} value={title} />
        <Input
          placeholder="Місцевість..."
          icon={LocationIcon}
          onTextChanged={handleImageLocationTextChange}
          onBlur={() => {
            setLocationHint([]);
          }}
          value={imageLocation}
        >
          {locationHint && locationHint.length > 0 && (
            <FlatList
              style={styles.locationHints}
              data={locationHint}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.locationHint}
                  onPress={() => {
                    setLocationHint([]);
                    setLocation(`${item.region}, ${item.country}`);
                  }}
                >
                  <Text style={styles.hintText}>
                    {item.region}, {item.country}
                  </Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={styles.hintContainer}
            />
          )}
        </Input>
      </View>
      <StylizedButton
        text="Опублікувати"
        onPress={handlePublishPress}
        disabled={!canPublish}
        style={!canPublish ? styles.disabled : undefined}
        textStyle={!canPublish ? styles.disabled : undefined}
      />
      <TouchableOpacity
        disabled={!isTrashActive}
        onPress={handleTrashPress}
        style={[
          styles.trashButton,
          { bottom: insets.bottom },
          !isTrashActive && styles.disabled,
        ]}
      >
        <TrashIcon
          size={24}
          strokeColor={
            isTrashActive
              ? globalStyles.colors.white
              : globalStyles.colors.regularGray
          }
          fillColor={
            isTrashActive
              ? globalStyles.colors.white
              : globalStyles.colors.regularGray
          }
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: globalStyles.colors.white,
    paddingTop: 32,
    paddingHorizontal: 16,
    gap: 32,
  },
  imageContent: {
    width: "100%",
    alignItems: "flex-start",
    gap: 8,
  },
  imageContainer: {
    width: "100%",
    height: 240,
    backgroundColor: globalStyles.colors.lightGray,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    borderColor: globalStyles.colors.strokeGray,
    borderWidth: 1,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
    backgroundImage: "cover",
    overflow: "hidden",
  },
  imageCamera: {
    width: "100%",
    height: "100%",
  },
  imageButton: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginLeft: -30,
    marginTop: -30,
    backgroundColor: globalStyles.colors.white,
    width: 60,
    height: 60,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  imageLoaded: {
    backgroundColor: globalStyles.colors.whiteTransparent,
  },
  imageText: {
    fontFamily: globalStyles.mainFont.regular,
    fontSize: 16,
    color: globalStyles.colors.regularGray,
  },
  trashButton: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: globalStyles.colors.accent,
    width: 70,
    height: 40,
  },
  disabled: {
    backgroundColor: globalStyles.colors.lightGray,
    color: globalStyles.colors.regularGray,
  },

  inputsContent: {
    width: "100%",
    gap: 16,
  },
  locationHints: {
    position: "absolute",
    left: 0,
    bottom: 60,
    width: "100%",
    maxHeight: 160,
    fontSize: 16,
    color: globalStyles.colors.primary,
    backgroundColor: globalStyles.colors.white,
    borderRadius: 8,
    borderColor: globalStyles.colors.accent,
    borderWidth: 1,
  },
  locationHint: {
    padding: 8,
    backgroundColor: globalStyles.colors.white,
    borderRadius: 8,
  },
  hintText: {
    color: globalStyles.colors.primary,
    fontSize: 16,
  },
  hintContainer: {
    gap: 16,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
});

export default CreatePostScreen;
