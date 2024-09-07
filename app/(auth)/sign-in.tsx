import { StyleSheet, Text, View, Image, Alert, ScrollView } from "react-native";
import React, { useState } from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { SignIn } from "@/lib/appwrite";

const Signin = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitForm = async (values: {
    email: string;
    password: string;
  }) => {
    if (!form.email || !form.password) {
      Alert.alert("Error", "Please fill all the fields");
    }

    setIsSubmitting(true);

    try {
      const result = await SignIn(form.email, form.password);
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
            handlePress={handleSubmitForm}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account?
            </Text>
            <Link
              href="/sign-up"
              className="text-lg font-psemibold text-secondary"
            >
              SignUp
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signin;

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
