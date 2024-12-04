import CameraIcon from "@/assets/icons/CameraIcon";
import TrashIcon from "@/assets/icons/TrashIcon";
import UniversalButton from "@/components/ui/UniversalButton";
import { globalStyles } from "@/styles/global";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import LocationIcon from "@/assets/icons/LocationIcon";
import Input from "@/components/ui/Input";
import StylizedButton from "@/components/ui/StylizedButton";
import { CreatePostFormData } from "@/data/types";
import { useNavigation } from "@react-navigation/native";


const CreatePostScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: false,
    });

    if (!result.canceled) {
      setFormData({
        ...formData,
        image: result.assets[0].uri,
      });
    }
  };

  const [formData, setFormData] = useState<CreatePostFormData>({
    title: "",
    imageLocation: "",
    image: "",
  });

  const { title, imageLocation, image } = formData;

  const [isRequiredFieldsFilled, setRequiredFieldsFilled] = useState(false);
  const [isAnyFieldFilled, setAnyFieldFilled] = useState(false);

  useEffect(() => {
    if (title || imageLocation || image) {
      setAnyFieldFilled(true);
    } else if (isAnyFieldFilled) {
      setAnyFieldFilled(false);
    }
  }, [title, imageLocation, image]);

  useEffect(() => {
    if (title && imageLocation && image) {
      setRequiredFieldsFilled(true);
    } else if (isRequiredFieldsFilled) {
      setRequiredFieldsFilled(false);
    }
  }, [title, imageLocation, image]);

  const handleTrashPress = () => {
    setFormData({
      title: "",
      imageLocation: "",
      image: "",
    });
  };

  const handlePublishPress = () => {
    console.log(
      `New post published: \n\ttitle ${title} \n\tlocation : ${imageLocation} \n\timage : ${image}`
    );

    setFormData({
      title: "",
      imageLocation: "",
      image: "",
    });

    navigation.navigate("posts");
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContent}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{ uri: image || undefined }}
            resizeMode="cover"
          />
          <UniversalButton
            onPress={pickImage}
            style={[styles.imageButton, image ? styles.imageLoaded : {}]}
          >
            <CameraIcon
              strokeColor={
                image
                  ? globalStyles.colors.white
                  : globalStyles.colors.regularGray
              }
              fillColor={
                image
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
        <Input
          placeholder="Назва..."
          onTextChanged={(text) => {
            setFormData({
              ...formData,
              title: text,
            });
          }}
          value={title}
        />
        <Input
          placeholder="Місцевість..."
          icon={LocationIcon}
          onTextChanged={(text) => {
            setFormData({
              ...formData,
              imageLocation: text,
            });
          }}
          value={imageLocation}
        />
      </View>
      <StylizedButton
        text="Опублікувати"
        onPress={handlePublishPress}
        disabled={!isRequiredFieldsFilled}
        style={!isRequiredFieldsFilled ? styles.disabled : undefined}
        textStyle={!isRequiredFieldsFilled ? styles.disabled : undefined}
      />
      <TouchableOpacity
        disabled={!isAnyFieldFilled}
        onPress={handleTrashPress}
        style={[
          styles.trashButton,
          { bottom: insets.bottom },
          !isAnyFieldFilled && styles.disabled,
        ]}
      >
        <TrashIcon
          size={24}
          strokeColor={
            isAnyFieldFilled
              ? globalStyles.colors.white
              : globalStyles.colors.regularGray
          }
          fillColor={
            isAnyFieldFilled
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
});

export default CreatePostScreen;
