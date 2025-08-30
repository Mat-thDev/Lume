import clsx from "clsx";
import { GeneralContainerProps } from "../../types";

const GeneralContainer = ({ children, id, theme, customStyle }: GeneralContainerProps) => {
  return (
    <div id={id} className={clsx("", customStyle)} data-theme={theme ?? "dark"}>
      {children}
    </div>
  )
}


export default GeneralContainer;
