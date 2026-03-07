// // hooks/useRegister.ts
// import { useMutation } from "@tanstack/react-query";
// import { registerUser, RegisterResponse } from "@/lib/auth";
// import { RegisterPayload } from "@/types/auth.types";
// import { AxiosError, AxiosResponse } from "axios";

// export const useRegister = () => {
//   return useMutation<AxiosResponse<RegisterResponse>, AxiosError, RegisterPayload>({
//     mutationFn: (payload: RegisterPayload) => registerUser(payload)
//   });
// };