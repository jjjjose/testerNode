//env

import { defineStore } from "pinia";
import axios, { AxiosInstance } from "axios";
let PORT_PUBLIC = process.env.PORT_PUBLIC || 3030;
let IP_PUBLIC = process.env.IP_PUBLIC || "localhost";
let URL: any;
let REMOVE_PORT = process.env.REMOVE_PORT || "false";
let HTTPS = process.env.HTTPS || "false";

if (HTTPS === "true") {
  URL = `https://${IP_PUBLIC}:${PORT_PUBLIC}/gql`;
  if (REMOVE_PORT === "true") {
    URL = `https://${IP_PUBLIC}/gql`;
  }
} else {
  URL = `http://${IP_PUBLIC}:${PORT_PUBLIC}/gql`;
  if (REMOVE_PORT === "true") {
    URL = `http://${IP_PUBLIC}/gql`;
  }
}
//@ts-ignore
let Scan: any = window.Scan;

export const useSubdomainsStore = defineStore("subdomains", {
  state: () => ({
    testingTheUrl: "" as string,
    testingStatus: false as boolean,
    subdomains: [] as any,
    subdomainsChecked: [] as any,
    // columns
    checkStatus: false,
    checkStatusTable: false,

    columns: [
      // {
      //   name: "id",
      //   required: true,
      //   label: "#id",
      //   align: "left",
      //   field: "id",
      //   // format: (val) => `${val}`,
      //   // sortable: true,
      // },
      {
        name: "subdomain",
        label: "Subdominios",
        align: "right",
        field: "subdomain",
        // sortable: true,
      },
      {
        name: "get",
        label: "GET",
        align: "center",
        field: "statusGET",
      },
      {
        name: "post",
        label: "POST",
        align: "center",
        field: "statusPOST",
      },
      {
        name: "put",
        label: "PUT",
        align: "center",
        field: "statusPUT",
      },
      {
        name: "delete",
        label: "DELETE",
        align: "center",
        field: "statusDELETE",
      },
      {
        name: "patch",
        label: "PATCH",
        align: "center",
        field: "statusPATCH",
      },
      {
        name: "head",
        label: "HEAD",
        align: "center",
        field: "statusHEAD",
      },
      {
        name: "options",
        label: "OPTIONS",
        align: "center",
        field: "statusOPTIONS",
      },
      {
        name: "trace",
        label: "TRACE",
        align: "center",
        field: "statusTRACE",
      },
    ],
    columns2: [
      {
        name: "id",
        required: true,
        label: "#id",
        align: "left",
        field: "id ",
        // format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "subdomain",
        label: "Subdominios",
        align: "right",
        field: "subdomain",
        sortable: true,
      },
    ],
  }),
  // getters: {
  //   doubleCount: (state) => state.counter * 2,
  // },

  actions: {
    async searchSubdomains(domain: string) {
      this.changeCheckStatusTable(false);
      this.subdomains = [];
      return new Promise(async (resolve, reject) => {
        let data = await Scan.scanAllApis(domain);
        if (data.length > 0) {
          this.subdomains = data;
          resolve(this.subdomains.length);
        } else {
          reject("No se encontraron subdominios");
        }
      });
    },
    async searchBruteForce(domain: any, dictionary: number) {
      this.changeCheckStatusTable(false);
      this.subdomains = [];
      const query = `query ScanBySubquest($host: String!, $dictionary: Float!) {
        scanBySubquest(host: $host, dictionary: $dictionary) {
          id
          subdomain
        }
      }`;
      let variables = {
        dictionary,
        host: domain,
      };
      return new Promise(async (resolve, reject) => {
        await axios
          .post(URL, {
            query,
            variables,
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            this.subdomains = res.data.data.scanBySubquest;
            resolve(this.subdomains.length);
          })
          .catch((err) => {
            reject(`${Error(err)}`);
          });
      });
    },
    async checkSubdomainStatus() {
      this.subdomainsChecked = [];
      this.changeCheckStatusTable(true);
      //VER EL ESTADO DE LOS SUBDOMINIOS EN TODOS LOS METODOS
      const query = `query CheckStatus($protocol: String!, $method: String!, $host: String!) {
        checkStatus(protocol: $protocol, method: $method, host: $host) {
          host
          infoHTTP {
            infoGET {
              status
            }
            infoPOST {
              status
            }
            infoPUT {
              status
            }
            infoDELETE {
              status
            }
            infoPATCH {
              status
            }
            infoHEAD {
              status
            }
            infoOPTIONS {
              status
            }
            infoTRACE {
              status
            }
          }
          infoHTTPS {
            infoGET {
              status
            }
            infoPOST {
              status
            }
            infoPUT {
              status
            }
            infoDELETE {
              status
            }
            infoPATCH {
              status
            }
            infoHEAD {
              status
            }
            infoOPTIONS {
              status
            }
            infoTRACE {
              status
            }
          }
        }
      }`;

      let methods = [
        "GET",
        "POST",
        "PUT",
        "DELETE",
        "PATCH",
        "HEAD",
        "OPTIONS",
        "TRACE",
      ];
      let protocols = ["http", "https"];
      let subdomains: any = this.subdomains;

      this.changeTestingStatus(true);
      let stat: boolean;
      //verificar el estado de los subdominios de cada host en cada protocolo y metodo
      for (let i = 0; i < subdomains.length; i++) {
        let host = subdomains[i].subdomain;
        this.testingTheUrl = host;
        //armando url
        let url = "";
        let data = await Scan.checkStatus(host, "all", "all");
        let dataHTTP: any = {
          subdomain: `http://${data.host}`,
          statusGET: data.infoHTTP.infoGET.status,
          statusPOST: data.infoHTTP.infoPOST.status,
          statusPUT: data.infoHTTP.infoPUT.status,
          statusDELETE: data.infoHTTP.infoDELETE.status,
          statusPATCH: data.infoHTTP.infoPATCH.status,
          statusHEAD: data.infoHTTP.infoHEAD.status,
          statusOPTIONS: data.infoHTTP.infoOPTIONS.status,
          statusTRACE: data.infoHTTP.infoTRACE.status,
        };
        this.subdomainsChecked.push(dataHTTP);
        let dataHTTPS: any = {
          subdomain: `https://${data.host}`,
          statusGET: data.infoHTTPS.infoGET.status,
          statusPOST: data.infoHTTPS.infoPOST.status,
          statusPUT: data.infoHTTPS.infoPUT.status,
          statusDELETE: data.infoHTTPS.infoDELETE.status,
          statusPATCH: data.infoHTTPS.infoPATCH.status,
          statusHEAD: data.infoHTTPS.infoHEAD.status,
          statusOPTIONS: data.infoHTTPS.infoOPTIONS.status,
          statusTRACE: data.infoHTTPS.infoTRACE.status,
        };
        this.subdomainsChecked.push(dataHTTPS);

        if (i == subdomains.length - 1) {
          this.changeTestingStatus(false);
          stat = true;
        }
      }
      return new Promise((resolve, reject) => {
        if (stat) {
          resolve(true);
        } else {
          reject(false);
        }
      });
    },
    changeCheckStatus(d: boolean) {
      this.checkStatus = d;
    },
    changeCheckStatusTable(d: boolean) {
      this.checkStatusTable = d;
    },
    changeTestingStatus(d: boolean) {
      this.testingStatus = d;
    },
  },
});
