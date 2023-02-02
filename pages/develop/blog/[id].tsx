import { useRouter } from "next/router";
import { getPostById } from "../../../data/postData";
import { Viewer } from "@toast-ui/react-editor";
import { TitleText } from "../../../components/styles/styleCompnents";
import {useState} from "react";
import Writer from "../../../utils/Writer";

export default function DetailPost() {
  const { query } = useRouter()
  const showData = getPostById(Number(query.id));

  const [introduction, setIntroduction] = useState("");
  const onIntroductionHandler = (data: string) => setIntroduction(data);

  return <>
    <div style={{display: "none"}}>
      <Writer value={introduction} onContentHandler={onIntroductionHandler}/>
    </div>
    <TitleText>{showData.title}</TitleText>
    <div>{showData.createdDate}</div>
    <img src={showData.thumbnailUrl} alt={"test"}/>
    <Viewer initialValue={showData.content}/>
  </>
}
