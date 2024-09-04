// import { Image, Text, View } from "react-native";
// import { Link } from "expo-router";
// import { StatusBar } from "expo-status-bar";
// // import { styled} from "nativewind";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { ScrollView } from "react-native";
// import { images } from "../constants";

// // const StyledView = styled(View);

// export default function App() {
//   return (
//     <SafeAreaView className="bg-primary h-full">
//       <ScrollView contentContainerStyle={{ height: "100%" }}>
//         <View className="w-full justify-center items-center h-full px-4 ">
//           <Image
//             source={images.logo}
//             className="w-[130px] h-[84px]"
//             resizeMode="contain"
//           />
//           <Image
//             source={images.cards}
//             className="max-w-[380px] w-full h-[300px] "
//             resizeMode="contain"
//           />
//           <View className="relative mt-5">
//             <Text className="text-white text-3xl font-bold text-center">
//               Discover Endless Possibilities with{" "}
//               <Text className="text-secondary-200   ">Aora</Text>
//             </Text>
//             <Image
//               source={images.path}
//               className="w-[136px] h-[15px] absolute -bottom-2 -right-8  "
//               resizeMode="contain"
//             />
//           </View>
//           <Text>Where creativity meets innovation</Text>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { Icon } from "react-native-elements";
// import * as ImagePicker from "react-native-image-picker";
import { Formik } from "formik";
import * as Yup from "yup";
import * as ImagePicker from "expo-image-picker";

// Validation schema
const SignUpSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

export default function SignUp() {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmitForm = (values: {
    name: string;
    email: string;
    password: string;
  }) => {
    if (!image) {
      Alert.alert("Validation Error", "Please upload a profile picture.");
      return;
    }

    // Proceed with submission (e.g., API call)
    Alert.alert(
      "Form Submitted",
      `Name: ${values.name}, Email: ${values.email}`
    );
  };

  return (
    <Formik
      initialValues={{ name: "", email: "", password: "" }}
      validationSchema={SignUpSchema}
      onSubmit={handleSubmitForm}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <View style={styles.container}>
          <Text style={styles.title}>Create an account✨</Text>
          <Text style={styles.subtitle}>
            Welcome! Please enter your details.
          </Text>

          {image && <Image source={{ uri: image }} style={styles.image} />}

          <TouchableOpacity
            style={styles.imageUploadButton}
            onPress={pickImage}
          >
            <Text style={styles.imageUploadText}>Upload Profile Picture</Text>
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            placeholderTextColor="#6c6c6c"
            value={values.name}
            onChangeText={handleChange("name")}
            onBlur={handleBlur("name")}
          />
          {errors.name && touched.name && (
            <Text style={styles.errorText}>{errors.name}</Text>
          )}

          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#6c6c6c"
            value={values.email}
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            keyboardType="email-address"
          />
          {errors.email && touched.email && (
            <Text style={styles.errorText}>{errors.email}</Text>
          )}

          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor="#6c6c6c"
              value={values.password}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              secureTextEntry
            />
            <Icon name="eye" type="font-awesome" color="#6c6c6c" />
          </View>
          {errors.password && touched.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}

          <Text style={styles.passwordHint}>Must be at least 8 characters</Text>

          <TouchableOpacity
            style={styles.signUpButton}
            onPress={() => handleSubmit()}
          >
            <Text style={styles.signUpButtonText}>Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.googleButton}>
            <Text style={styles.googleButtonText}>Sign up with Google</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1c1c",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#c7c7c7",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#2a2a2a",
    borderRadius: 8,
    padding: 15,
    color: "#fff",
    marginBottom: 15,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  passwordHint: {
    color: "#c7c7c7",
    marginBottom: 20,
  },
  signUpButton: {
    backgroundColor: "#ff6363",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  signUpButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  googleButton: {
    backgroundColor: "#4c4c4c",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  googleButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  imageUploadButton: {
    backgroundColor: "#4c4c4c",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  imageUploadText: {
    color: "#fff",
    fontSize: 16,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    alignSelf: "center",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
  },
});
