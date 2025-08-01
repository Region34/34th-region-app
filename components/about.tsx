import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

export default function About() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">About RCCG 34TH REGION</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Spreading the Gospel of Jesus Christ and building lives through the power of God
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <Card className="p-6">
              <CardContent className="p-0">
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To make heaven, to take as many people with us, and to have a member of RCCG in every family of all
                  nations. We are committed to spreading the Gospel of Jesus Christ through evangelism, discipleship,
                  and community service.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="p-0">
                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To be a model Christian organization that demonstrates the love of Christ through our actions, builds
                  strong communities of believers, and impacts society positively through our various programs and
                  initiatives.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="p-0">
                <h3 className="text-2xl font-bold mb-4">Our Values</h3>
                <ul className="text-muted-foreground space-y-2">
                  <li>• Holiness and Righteousness</li>
                  <li>• Love and Unity</li>
                  <li>• Excellence in Service</li>
                  <li>• Integrity and Transparency</li>
                  <li>• Community Impact</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="RCCG 34TH REGION Church"
              width={600}
              height={400}
              className="rounded-lg shadow-lg w-full"
            />

            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4 text-center">
                <CardContent className="p-0">
                  <div className="text-3xl font-bold text-primary mb-2">500+</div>
                  <div className="text-sm text-muted-foreground">Parishes</div>
                </CardContent>
              </Card>
              <Card className="p-4 text-center">
                <CardContent className="p-0">
                  <div className="text-3xl font-bold text-primary mb-2">50K+</div>
                  <div className="text-sm text-muted-foreground">Members</div>
                </CardContent>
              </Card>
              <Card className="p-4 text-center">
                <CardContent className="p-0">
                  <div className="text-3xl font-bold text-primary mb-2">25+</div>
                  <div className="text-sm text-muted-foreground">Areas</div>
                </CardContent>
              </Card>
              <Card className="p-4 text-center">
                <CardContent className="p-0">
                  <div className="text-3xl font-bold text-primary mb-2">10+</div>
                  <div className="text-sm text-muted-foreground">Zones</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
