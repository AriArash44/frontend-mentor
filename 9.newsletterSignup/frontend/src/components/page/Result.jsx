import ResultLayput from "../layout/Result";

const ResultPage = (props) => {
    return (
      <ResultLayput>
        <ResultLayput.header>
          <h1>{props.title}</h1>
        </ResultLayput.header>
      </ResultLayput>
    );
};

export default ResultPage;