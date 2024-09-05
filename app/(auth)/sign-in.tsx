import {
  StyleSheet,
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

const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid Email").required("Email is Required"),
  password: Yup.string()
    .min(8, "Password must be atleast 8 characters")
    .required("Passwprd is required"),
});

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [image, setImage] = useState<string | null>(null);

  const handleSubmitForm = (values: { email: string; password: string }) => {
    Alert.alert(
      "Form Submitted",
      `Email: ${values.email} Password: ${values.password} `
    );
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold ">
            SignIn
          </Text>

          <FormField
            title="email"
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
            title="Sign In"
            handlePress={SignIn}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

// <Formik
//   initialValues={{ email: "", password: "" }}
//   validationSchema={SignInSchema}
//   onSubmit={handleSubmitForm}
// >
//   {({
//     handleChange,
//     handleBlur,
//     handleSubmit,
//     values,
//     errors,
//     touched,
//   }) => (
//     <View style={styles.container}>
//       {image && <Image source={{ uri: image }} style={styles.image} />}

//       <TextInput
//         style={styles.input}
//         placeholder="Enter Your Email"
//         placeholderTextColor="#6c6c6c"
//         value={values.email}
//         onChangeText={handleChange("email")}
//       />
//       {errors.email && touched.email && (
//         <Text style={styles.errorText}>{errors.email}</Text>
//       )}

//       <View style={styles.passwordContainer}>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter your password"
//           placeholderTextColor="#6c6c6c"
//           value={values.password}
//           onChangeText={handleChange("password")}
//         />
//         <Icon type="font-awesome" name="eye" color="#6c6c6c" />
//       </View>
//       {errors.password && touched.password && (
//         <Text style={styles.errorText}>{errors.password}</Text>
//       )}
//       <Text style={styles.passwordHint}>Must be at least 8 characters</Text>

//       <TouchableOpacity
//         style={styles.signUpButton}
//         onPress={() => handleSubmit()}
//       >
//         <Text style={styles.signUpButtonText}>Sign In</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.googleButton}>
//         <Text style={styles.googleButtonText}>Sign In with Google</Text>
//       </TouchableOpacity>
//     </View>
//   )}
// </Formik>

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
