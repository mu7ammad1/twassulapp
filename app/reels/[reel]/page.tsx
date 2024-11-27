import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default async function Page({ params }: { params: { reel: string } }) {
  const reel = params.reel;

  return (
    <main className={`p-0`}>
      <Carousel
        orientation="vertical"
        opts={{
          align: "center",
          loop: true,
        }}
        className="relative p-0"
      >
        <CarouselContent className="h-screen w-[487px] max-md:w-full *:bg-teal-800 *:p-4 ">
          <CarouselItem>
            <div className="flex gap-2 items-center justify-end">
              <b>{reel}</b>
              <Avatar className="size-9 *:object-cover">
                <AvatarImage
                  src={`https://i.pinimg.com/736x/df/26/29/df2629099446e19945caf61fa04e96a7.jpg`}
                />
                <AvatarFallback>VC</AvatarFallback>
              </Avatar>
            </div>
          </CarouselItem>
          <CarouselItem>{reel}</CarouselItem>
          <CarouselItem>{reel}</CarouselItem>
          <CarouselItem>{reel}</CarouselItem>
          <CarouselItem>{reel}</CarouselItem>
          <CarouselItem>{reel}</CarouselItem>
          <CarouselItem>{reel}</CarouselItem>
          <CarouselItem>{reel}</CarouselItem>
          <CarouselItem>{reel}</CarouselItem>
          <CarouselItem>{reel}</CarouselItem>
          <CarouselItem>{reel}</CarouselItem>
          <CarouselItem>{reel}</CarouselItem>
          <CarouselItem>{reel}</CarouselItem>
          <CarouselItem>{reel}</CarouselItem>
          <CarouselItem>{reel}</CarouselItem>
          <CarouselItem>{reel}</CarouselItem>
          <CarouselItem>{reel}</CarouselItem>
          <CarouselItem>{reel}</CarouselItem>
          <CarouselItem>{reel}</CarouselItem>
          <CarouselItem>{reel}</CarouselItem>
        </CarouselContent>
        <CarouselPrevious className="absolute -left-10 top-[50%] max-md:hidden" />
        <CarouselNext className="absolute -left-10 bottom-[50%] max-md:hidden" />
      </Carousel>
    </main>
  );
}
