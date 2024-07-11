
export function HeaderCompanyProfile() {
  return (
    <div className="w-full bg-muted">
      <div className="container py-12 px-4 md:px-6">
        <div className="relative h-[400px] md:h-[600px] overflow-hidden rounded-t-xl">
          <img
            src="/placeholder.svg"
            alt="Cover image"
            width={1920}
            height={600}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="relative -mt-[80px] md:-mt-[120px]">
          <div className="flex items-end gap-4">
            <div className="relative h-[120px] w-[120px] md:h-[160px] md:w-[160px] rounded-full border-4 border-background">
              <img
                src="/placeholder.svg"
                alt="Profile picture"
                width={160}
                height={160}
                className="h-full w-full rounded-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold md:text-3xl">John Doe</h1>
              <p className="text-muted-foreground">@johndoe</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
