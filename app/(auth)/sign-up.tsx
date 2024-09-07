// signup.tsx
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { Icon } from "react-native-elements";
import { Formik } from "formik";
import * as Yup from "yup";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { createUser } from "@/lib/appwrite";

const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // const [image, setImage] = useState<string | null>(null);

  const handleSubmitForm = async (values: {
    email: string;
    password: string;
  }) => {
    if (!form.username || !form.email || !form.password) {
      Alert.alert("Error", "Please fill all the fields");
    }

    setIsSubmitting(true);

    try {
      const result = await createUser(form.email, form.password, form.username);
      // set it to global state
      router.replace("/home");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[83vh] px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold ">
            Sign up to aora
          </Text>

          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e: any) => setForm({ ...form, username: e })}
            otherStyles="mt-10 "
          />
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e: any) => setForm({ ...form, email: e })}
            otherStyles="mt-7  "
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e: any) => setForm({ ...form, password: e })}
            otherStyles="mt-7  "
            keyboardType="email-address"
          />
          <CustomButton
            title="Sign up"
            handlePress={handleSubmitForm}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              have an account already ?
            </Text>
            <Link
              href="/sign-in"
              className="text-lg font-psemibold text-secondary"
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;

// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   Button,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   Alert,
// } from "react-native";
// import { Icon } from "react-native-elements";
// // import * as ImagePicker from "react-native-image-picker";
// import { Formik } from "formik";
// import * as Yup from "yup";
// import * as ImagePicker from "expo-image-picker";

// // Validation schema
// const SignUpSchema = Yup.object().shape({
//   name: Yup.string().required("Name is required"),
//   email: Yup.string().email("Invalid email").required("Email is required"),
//   password: Yup.string()
//     .min(8, "Password must be at least 8 characters")
//     .required("Password is required"),
// });

// export default function SignUp() {
//   const [image, setImage] = useState<string | null>(null);

//   const pickImage = async () => {
//     // No permissions request is necessary for launching the image library
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.All,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });
//     // console.log(result);

//     if (!result.canceled) {
//       setImage(result.assets[0].uri);
//     }
//   };

//   const handleSubmitForm = (values: {
//     name: string;
//     email: string;
//     password: string;
//   }) => {
//     if (!image) {
//       Alert.alert("Validation Error", "Please upload a profile picture.");
//       return;
//     }

//     // Proceed with submission (e.g., API call)
//     Alert.alert(
//       "Form Submitted",
//       `Name: ${values.name}, Email: ${values.email}`
//     );
//   };

//   return (
//     <Formik
//       initialValues={{ name: "", email: "", password: "" }}
//       validationSchema={SignUpSchema}
//       onSubmit={handleSubmitForm}
//     >
//       {({
//         handleChange,
//         handleBlur,
//         handleSubmit,
//         values,
//         errors,
//         touched,
//       }) => (
//         <View style={styles.container}>
//           <Text style={styles.title}>Create an account✨</Text>
//           <Text style={styles.subtitle}>
//             Welcome! Please enter your details.
//           </Text>

//           {image && <Image source={{ uri: image }} style={styles.image} />}

//           <TouchableOpacity
//             style={styles.imageUploadButton}
//             onPress={pickImage}
//           >
//             <Text style={styles.imageUploadText}>Upload Profile Picture</Text>
//           </TouchableOpacity>

//           <TextInput
//             style={styles.input}
//             placeholder="Enter your name"
//             placeholderTextColor="#6c6c6c"
//             value={values.name}
//             onChangeText={handleChange("name")}
//             onBlur={handleBlur("name")}
//           />
//           {errors.name && touched.name && (
//             <Text style={styles.errorText}>{errors.name}</Text>
//           )}

//           <TextInput
//             style={styles.input}
//             placeholder="Enter your email"
//             placeholderTextColor="#6c6c6c"
//             value={values.email}
//             onChangeText={handleChange("email")}
//             onBlur={handleBlur("email")}
//             keyboardType="email-address"
//           />
//           {errors.email && touched.email && (
//             <Text style={styles.errorText}>{errors.email}</Text>
//           )}

//           <View style={styles.passwordContainer}>
//             <TextInput
//               style={styles.input}
//               placeholder="Enter your password"
//               placeholderTextColor="#6c6c6c"
//               value={values.password}
//               onChangeText={handleChange("password")}
//               onBlur={handleBlur("password")}
//               secureTextEntry
//             />
//             <Icon name="eye" type="font-awesome" color="#6c6c6c" />
//           </View>
//           {errors.password && touched.password && (
//             <Text style={styles.errorText}>{errors.password}</Text>
//           )}

//           <Text style={styles.passwordHint}>Must be at least 8 characters</Text>

//           <TouchableOpacity
//             style={styles.signUpButton}
//             onPress={() => handleSubmit()}
//           >
//             <Text style={styles.signUpButtonText}>Sign Up</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.googleButton}>
//             <Text style={styles.googleButtonText}>Sign up with Google</Text>
//           </TouchableOpacity>
//         </View>
//       )}
//     </Formik>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#1c1c1c",
//     padding: 20,
//     justifyContent: "center",
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#fff",
//     marginBottom: 10,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: "#c7c7c7",
//     marginBottom: 20,
//   },
//   input: {
//     backgroundColor: "#2a2a2a",
//     borderRadius: 8,
//     padding: 15,
//     color: "#fff",
//     marginBottom: 15,
//   },
//   passwordContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },
//   passwordHint: {
//     color: "#c7c7c7",
//     marginBottom: 20,
//   },
//   signUpButton: {
//     backgroundColor: "#ff6363",
//     paddingVertical: 15,
//     borderRadius: 8,
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   signUpButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   googleButton: {
//     backgroundColor: "#4c4c4c",
//     paddingVertical: 15,
//     borderRadius: 8,
//     alignItems: "center",
//   },
//   googleButtonText: {
//     color: "#fff",
//     fontSize: 16,
//   },
//   imageUploadButton: {
//     backgroundColor: "#4c4c4c",
//     paddingVertical: 15,
//     borderRadius: 8,
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   imageUploadText: {
//     color: "#fff",
//     fontSize: 16,
//   },
//   image: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     marginBottom: 20,
//     alignSelf: "center",
//   },
//   errorText: {
//     color: "red",
//     fontSize: 14,
//     marginBottom: 10,
//   },
// });
