export default function SidebarSearchComponent() {
  // const { user } = useUser()

  return (
    <div className="mb-12 flex h-full flex-col">
      <div className="flex-1 px-4">
        <div className="mb-4 flex items-center gap-2">
          <input
            type="text"
            placeholder="Search..."
            // onChange={}
            className="-mt-4 w-full rounded-md border bg-black/40 px-3 py-2 text-white focus:outline-none dark:border-purple-700 dark:bg-purple-950/20 dark:text-purple-200"
          />
        </div>
      </div>
    </div>
  );
}
