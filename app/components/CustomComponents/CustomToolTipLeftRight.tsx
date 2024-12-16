interface toolTip {
  content: String;
  top: String;
  left: number;
  translateY: String;
}

export default function CustomToolTipLeftRight({
  content,
  top,
  left,
  translateY,
}: toolTip) {
  const isRightAligned = left < 0;

  return (
    <>
      <div
        className={`
          invisible absolute whitespace-nowrap
          rounded-md dark:bg-black bg-gray-200 px-2 py-1
          text-sm dark:text-white text-black opacity-20 transition-all
          group-hover:visible group-hover:opacity-100
          ${isRightAligned ? "right-0" : "left-0"}
        `}
        style={{
          top: `${top}px`,
          ...(isRightAligned
            ? { right: `${Math.abs(left)}px` }
            : { left: `${left}px` }),
          transform: `translateY(${translateY}px)`,
        }}
      >
        {content}
      </div>
    </>
  );
}
