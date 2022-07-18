import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId:
        "739099921186-j430hlp2g5qnrlusssd98rlg9ptt56vm.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
});
