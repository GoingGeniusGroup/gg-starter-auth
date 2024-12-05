// NOTE: make sure you add group in the parent element className
interface toolTip {
  content : String
  top : String
  left: String
  translateY : String
}

export default function CustomToolTip({ content, top, left, translateY }: toolTip) {
  return (
    <>
      <div
        className={`
          invisible absolute whitespace-nowrap
          rounded-md bg-indigo-100 px-2 py-1
          text-sm text-indigo-800 opacity-20 transition-all
          group-hover:visible group-hover:translate-x-0 group-hover:opacity-100
      `}
        style={{
          top: `${top}px`,
          left: `${left}px`,
          transform: `translateY(${translateY}px)`,
        }}
      >
        {content}
      </div>
    </>
  )
}
