import { Social } from "@/app/components/auth/social";
import { Button } from "@/app/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/app/components/ui/card";
import { Separator } from "@/app/components/ui/separator";
import Image from "next/image";
import Link from "next/link";

type CardWrapperProps = React.HTMLAttributes<HTMLDivElement> & {
  headerTitle: string;
  headerDescription: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
  heroImage?: string;
};

export const CardWrapper = (props: CardWrapperProps) => {
  const {
    heroImage,
    headerTitle,
    headerDescription,
    backButtonLabel,
    backButtonHref,
    showSocial,
    children,
    ...rest
  } = props;

  return (
    <Card className="w-[400px] shadow mx-4 md:mx-0" {...rest}>
      {heroImage ? (
        <div className="w-1/4 relative pt-6 mx-auto">
          <Image src={heroImage} alt="Hero Image" width={24} height={24} className="relative w-full h-full max-w-md select-none" />
        </div>
      ) : null}
      <CardHeader className="text-center">
        <CardTitle>{headerTitle}</CardTitle>
        <CardDescription>{headerDescription}</CardDescription>
      </CardHeader>
      {children ? <CardContent>{children}</CardContent> : null}
      {showSocial ? (
        <>
          <CardFooter className="gap-x-2">
            <Separator className="shrink" />
            <p className="text-sm text-center basis-full">Or connect with</p>
            <Separator className="shrink" />
          </CardFooter>
          <CardFooter>
            <Social />
          </CardFooter>
        </>
      ) : null}
      <Separator />
      <CardFooter className="py-3">
        <Button variant="link" className="font-normal w-full" size="sm" asChild>
          <Link href={backButtonHref}>{backButtonLabel}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
