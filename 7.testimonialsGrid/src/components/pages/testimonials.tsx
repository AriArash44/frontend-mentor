import Card from "../common/Card.tsx";
import { graduateStatus } from "../../types/graduateStatus";

const headers = {
    daniel: "I received a job offer mid-course, and the subjects I learned were current, if not more so, in the company I joined. I honestly feel I got every penny’s worth.",
    jonathan: "The team was very supportive and kept me motivated",
    kira: "Such a life-changing experience. Highly recommended!",
    jeanette: "An overall wonderful and rewarding experience",
    patrick: "Awesome teaching support from TAs who did the bootcamp themselves. Getting guidance from them and learning from their experiences was easy."
}

const captions = {
    daniel: "I was an EMT for many years before I joined the bootcamp. I’ve been looking to make a transition and have heard some people who had an amazing experience here. I signed up for the free intro course and found it incredibly fun! I enrolled shortly thereafter. The next 12 weeks was the best - and most grueling - time of my life. Since completing the course, I’ve successfully switched careers, working as a Software Engineer at a VR startup.",
    jonathan: "I started as a total newbie with virtually no coding skills. I now work as a mobile engineer for a big company. This was one of the best investments I’ve made in myself.",
    kira: "Before joining the bootcamp, I’ve never written a line of code. I needed some structure from professionals who can help me learn programming step by step. I was encouraged to enroll by a former student of theirs who can only say wonderful things about the program. The entire curriculum and staff did not disappoint. They were very hands-on and I never had to wait long for assistance. The agile team project, in particular, was outstanding. It took my learning to the next level in a way that no tutorial could ever have. In fact, I’ve often referred to it during interviews as an example of my developent experience. It certainly helped me land a job as a full-stack developer after receiving multiple offers. 100% recommend!",
    jeanette: "Thank you for the wonderful experience! I now have a job I really enjoy, and make a good living while doing something I love.",
    patrick: "The staff seem genuinely concerned about my progress which I find really refreshing. The program gave me the confidence necessary to be able to go out in the world and present myself as a capable junior developer. The standard is above the rest. You will get the personal attention you need from an incredible community of smart and amazing people."
}

const Testimonals = () => {
    return (
      <div className="grid md:grid-cols-2 md:grid-row-6 lg:grid-cols-3 lg:grid-rows-3 xl:grid-cols-4 xl:grid-rows-2 w-9/10 xl:w-17/20 gap-8 my-30">
        <div className="row-start-1 col-start-1 md:row-span-2 lg:row-span-1 lg:col-span-2">
          <Card avatar="/images/image-daniel.jpg" borderColor="purple-300" qutation={true} name="Daniel Clifford" status={graduateStatus.VerifiedGraduated} header={headers.daniel} caption={captions.daniel} bgColor="purple-500" primaryColor="white" secondaryColor="purple-300" />
        </div><div className="lg:col-span-2 xl:col-span-1">
          <Card avatar="/images/image-jonathan.jpg" borderColor="gray-500" name="Jonathan Walters" status={graduateStatus.VerifiedGraduated} header={headers.jonathan} caption={captions.jonathan} bgColor="gray-500" primaryColor="white" secondaryColor="white" />
        </div><div>
          <Card avatar="/images/image-jeanette.jpg" borderColor="white" name="Jeanette Harmon" status={graduateStatus.VerifiedGraduated} header={headers.jeanette} caption={captions.jeanette} bgColor="white" primaryColor="gray-500" secondaryColor="gray-400" />
        </div><div className="md:col-span-2">
          <Card avatar="/images/image-patrick.jpg" borderColor="purple-500" name="Patrick Abrams" status={graduateStatus.VerifiedGraduated} header={headers.patrick} caption={captions.patrick} bgColor="dark-blue" primaryColor="gray-100" secondaryColor="gray-200" />
        </div><div className="md:row-start-2 md:col-start-2 lg:col-start-3 lg:row-start-1 xl:col-start-4 md:row-span-2">
          <Card avatar="/images/image-kira.jpg" borderColor="white" name="Kira Whittle" status={graduateStatus.VerifiedGraduated} header={headers.kira} caption={captions.kira} bgColor="white" primaryColor="gray-500" secondaryColor="gray-400" />
        </div>
      </div>
    );
}

export default Testimonals;