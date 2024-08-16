import { userApiFactory } from "@/apiFactory/users";
export const useCreateUser = () => {
  const router = useRouter();
  const form = ref({
    fname: "",
    lname: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    handle: "",
    gender: "",
    dob: "",
    imageSrc: "",
  }) as any;
  const processing = ref(false);

  const genderType = ref([
    {
      text: "Male",
      value: "male",
    },
    {
      text: "Female",
      value: "female",
    },
  ]);

  const isFormEmpty = computed(() => {
    return !!(
      form.value.fname &&
      form.value.lname &&
      form.value.phone &&
      form.value.email &&
      form.value.password &&
      form.value.confirmPassword &&
      form.value.gender &&
      form.value.dob &&
      form.value.handle
    );
  });
  const createUser = async () => {
    processing.value = true;
    const createUserPayload = {
      email: form.value.email,
      password: form.value.password,
      phone: '',
      fname: form.value.fname,
      lname: form.value.lname,
      profilePicture: form.value.imageSrc,
      handle: form.value.handle,
      dateOfBirth: form.value.dob,
      countryCode: ''
    };
    try {
      const response = await userApiFactory.createUser(createUserPayload);
      router.push("/dashboard/users");
      return response;
    } catch (error: any) {
      useNuxtApp().$toast.error(error.message, {
        autoClose: 5000,
        dangerouslyHTMLString: true,
      });
      return error;
    } finally {
      processing.value = false;
    }
  };

  const setPayload = (data: any) => {
    // form.value.email = data.email;
    // form.value.password = data.password;
    // form.value.phone = "";
    // form.value.fname = data.fname;
    // form.value.lname = data.lname;
    form.value.imageSrc = data.profilePicture;
    // form.value.handle = data.handle;
    // form.value.dob = data.dob;
  };

  return { createUser, isFormEmpty, form, genderType, processing, setPayload };
};
