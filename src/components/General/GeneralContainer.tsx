import clsx from "clsx";

type GeneralContainerProps = {
  children: React.ReactNode;
  customStyle?: string;
}


const GeneralContainer = ({ children, customStyle }: GeneralContainerProps) => {
  return (
    <main className={clsx("", customStyle)}>
      {children}
    </main>
  )
}


export default GeneralContainer;
