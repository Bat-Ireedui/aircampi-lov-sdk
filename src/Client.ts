export class Client {
  private client_id: string;
  private domain: string;

  constructor(config: Config) {
    this.client_id = config.client_id;

    this.domain = config.domain || "http://localhost:8536";
    console.log("Working");
  }

  public getLookups(): Promise<Lookups> {
    return fetch(`${this.domain}/lookups`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        client_id: this.client_id,
      },
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    });
  }
}

type Config = {
  client_id: string;
  domain?: string;
};

interface Lookups {
  total_count: number;
  count: number;
  has_more: boolean;
  limit: number;
  offset: number;
  items: object[];
}
