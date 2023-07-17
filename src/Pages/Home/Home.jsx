import "./Home.css";
import logo from "../../Assets/logop.png";
import Header from "../../Components/Header/Header";

function Home() {
  return (
    <main className="flex justify-center items-center mr-40 ml-40 height-auto flex-1 mb-28 ">
      <section className="w-[50%]">
        <h2 className="text-6xl mb-6 gradient-text">
          Rediscover Lost Possessions Swiftly - FindInABlink, Your Local-First
          App!
        </h2>
        <p className="text-xl text-[#A8A196] font-[600]">
          FindInABlink - Where lost items find their way home. Our compassionate
          community and smart search tools make the process seamless. Reclaim
          what's yours swiftly and rediscover peace of mind today!
        </p>
      </section>
      <section className="w-[50%] flex justify-center items-center">
        {/* <img
            width="350"
            height="500"
            src="https://img.icons8.com/3d-fluency/94/lightning-bolt.png"
            alt="lightning-bolt"
          /> */}
        <img className="w-[350px] h-[500px]" src={logo} />
      </section>
    </main>
  );
}

export default Home;
