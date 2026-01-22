import callApi from "@/config/axios/axios";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export const getSessionId = async ({
  page,
  setLoading,
  router,
}: {
  page: string;
  setLoading: (loading: boolean) => void;
  router: any;
}) => {
  setLoading(true);
  try {
    const session = await supabase.auth.getSession();
    const access_token = session.data.session?.access_token || "";

    const { data } = await callApi.post("/app-v2/planning/create-pdca", {
      page,
      access_token: access_token,
    });

    if (data.session_id) {
      router.push(`/app-v2/planning/${data.session_id}/what`);
      setLoading(false);
    }
  } catch (error) {
    console.log(error);
    setLoading(false);
  }
};
