import capitalise from "./capitalise"

const transformText = (str: any) => {
    const strArr: Array<string> = str.replace(/-/g, " ").split(" ").map((elem: any) => {
      return capitalise(elem)
    })

    return strArr.join(" ")
  }

  export default transformText;