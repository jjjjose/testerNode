import { defineStore } from "pinia";
import axios, { AxiosInstance } from "axios";

export const useSubdomainsStore = defineStore("subdomains", {
  state: () => ({
    subdomains: [],
  }),
  // getters: {
  //   doubleCount: (state) => state.counter * 2,
  // },

  actions: {
    async seachSubdomains(domain: string) {
      //solicitar subdominios a la api graphql
      const query = `query ScanByVirusTotal($host: String!) {
                        scanByVirusTotal(host: $host) {
                          subdomain
                        }
                      }`;

      let variables = {
        host: domain,
      };
      const URL = "http://192.100.100.249:3030/gql";
      const response: any = await axios
        .post(URL, {
          query,
          variables,
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          // console.log(res.data.data.scanByVirusTotal);
          this.subdomains = res.data.data.scanByVirusTotal;
        });
    },
  },
});
