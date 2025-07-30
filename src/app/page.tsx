export default function Home() {
  return (
    <div className="flex-1 w-full flex flex-col items-center justify-center min-h-[70vh]">
      <div className="text-center">
        <h1 className="text-6xl md:text-7xl font-bold text-foreground mb-8 tracking-wide">
          Seetha Rama Vivaha Trust
        </h1>
        <h2 className="text-4xl md:text-5xl font-semibold text-primary mb-12">
          Bhavani
        </h2>
        
        <div className="max-w-2xl mx-auto">
          <p className="text-xl text-muted-foreground mb-8">
            Welcome to our digital platform for managing donations and devotee services.
          </p>
          
          <div className="p-6 bg-muted/50 rounded-lg border">
            <p className="text-muted-foreground text-sm">
              <strong className="text-foreground">For Administrative Access:</strong> Please use the sign-in option to access the management system.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
