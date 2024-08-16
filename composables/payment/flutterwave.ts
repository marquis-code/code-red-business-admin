import { useFlutterwave } from "flutterwave-vue3";
import { useLogin } from "@/composables/auth/login";
import logo from "@/assets/img/pod-plus-logo.png";
export const useFlutterwaveSDK = () => {
  const { user } = useLogin();
  const router = useRouter();
  const paymentForm = ref({
    amount: "" as any,
  });
  const loading = ref(false);
  const computedUsername = computed(() => {
    return `${user.value.firstname} ${user.value.lastname}`;
  });

  const handlePayment = async () => {
    loading.value = true;
    try {
      const paymentResult = await new Promise((resolve, reject) => {
        useFlutterwave({
          amount: Number(paymentForm.value.amount),
          callback(data: any): void {
            if (data.status === 'successful') {
              resolve(data);
            } else {
              reject(new Error('Payment was not successful'));
            }
          },
          country: "NG",
          currency: "NGN",
          customer: {
            email: user.value.email,
            name: computedUsername.value,
            phone_number: '08147626503',
          },
          customizations: {
            description: "Pay with CodeRed",
            logo: logo,
            title: "CodeRed",
          },
          meta: {
            user_id: 1,
            token: "jdjdjdjdjd",
          },
          onclose(): void {
            reject(new Error('Payment window closed'));
          },
          payment_options: "card",
          public_key: import.meta.env.VITE_FLW_PUBLIC_KEY,
          redirect_url: undefined,
          tx_ref: "tx_ref_herer_h92hjyj3",
        });
      });

      return paymentResult;
    } catch (error) {
      console.error('Payment failed:', error);
      throw error;
    } finally {
      loading.value = false;
    }
  };

  return { handlePayment, paymentForm, loading };
};
