import React, { useEffect, useRef, useState } from "react";
import { View, TouchableOpacity, Image, Text, FlatList } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/redux/store";
import { addNewPost } from "@/src/redux/reducers/postsSlice";
import { addPost } from "@/src/utils/firestore";
import { Coordinates, PostType } from "@/src/data/post";
import CameraIcon from "@/assets/icons/CameraIcon";
import TrashIcon from "@/assets/icons/TrashIcon";
import UniversalButton from "@/src/components/ui/UniversalButton";
import Input from "@/src/components/ui/Input";
import StylizedButton from "@/src/components/ui/StylizedButton";
import LocationIcon from "@/assets/icons/LocationIcon";
import { globalStyles } from "@/styles/global";
import styles from "@/src/screens/tabs/CreatePostScreen/styles";

const CreatePostScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.userInfo);

  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [locationHint, setLocationHint] = useState<Location.LocationGeocodedAddress[]>();
  const [title, setTitle] = useState("");
  const [imageLocation, setLocation] = useState("");
  const [locationCoords, setLocationCoords] = useState<Coordinates>({ latitude: 0, longitude: 0 });
  const [image, setImage] = useState("");
  const [canPublish, setCanPublish] = useState(false);
  const [isTrashActive, setTrashActive] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

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

  useEffect(() => {
    const getCurrentLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const tempAddress = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (image && !imageLocation) {
        setLocationCoords({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
        setLocation(`${tempAddress[0].region}, ${tempAddress[0].country}`);
      }
    };

    getCurrentLocation();
  }, [image]);

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

    try {
      const data = await cameraRef.current?.takePictureAsync();
      if (data) {
        await MediaLibrary.saveToLibraryAsync(data.uri);
        setImage(data.uri);
      }
    } catch (error) {
      console.error("Error taking photo: ", error);
    } finally {
      console.log("Photo process completed");
    }
  };

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
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }
    if (textLocation.length < 3) {
      return;
    }

    const tempLocation = await Location.geocodeAsync(textLocation);
    const tempHints = await Location.reverseGeocodeAsync({
      latitude: tempLocation[0].latitude,
      longitude: tempLocation[0].longitude,
    });

    setLocationHint(tempHints);
  };

  const handlePublishPress = async () => {
    if (currentUser) {
      setIsPublishing(true);
      const post: PostType = {
        id: `${currentUser.userId}_${Date.now()}`,
        ownerId: currentUser.userId,
        image,
        title,
        comments: [],
        likes: 0,
        likesUsers: [],
        location: imageLocation,
        coordinates: locationCoords,
        createdAt: Date.now(),
      };

      const newPost = await addPost(currentUser.userId, post);
      dispatch(addNewPost(newPost));

      setImage("");
      setTitle("");
      setLocation("");
      navigation.navigate("posts");
      setIsPublishing(false);
    }
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
              image || permission?.status === "granted" ? styles.imageLoaded : {},
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
        <Text style={styles.imageText}>
          {image ? "Редагувати фото" : "Завантажте фото"}
        </Text>
      </View>
      <View style={styles.inputsContent}>
        <Input placeholder="Назва..." onTextChanged={setTitle} value={title} />
        <Input
          placeholder="Місцевість..."
          icon={LocationIcon}
          onTextChanged={handleImageLocationTextChange}
          onBlur={() => setLocationHint([])}
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
        disabled={(!canPublish || isPublishing)}
        style={(!canPublish || isPublishing) ? styles.disabled : undefined}
        textStyle={(!canPublish || isPublishing) ? styles.disabled : undefined}
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

export default CreatePostScreen;
