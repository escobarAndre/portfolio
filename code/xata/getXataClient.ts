import { XataClient } from "@xata/client";

export const getXataClient = () => {
	instance: Object = new XataClient({
		apiKey: process.env.XATA_API_KEY,
	});

	return instance;
};
