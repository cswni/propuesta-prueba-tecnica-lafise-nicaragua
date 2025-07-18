type HeadingLineProps = {
  text: string;
};

const HeadingLine = (props: HeadingLineProps) => {
  const { text } = props;
  return <h1 className="text-[20px] ml-6 font-semibold leading-[24px]">{text}</h1>;
};

export default HeadingLine;
