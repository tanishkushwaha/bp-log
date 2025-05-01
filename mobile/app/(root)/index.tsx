import { Redirect } from "expo-router";

export default function Index() {
  return <Redirect href='/readings' />;
}

// so that when the app starts up, it straight away goes to the /readings tab
