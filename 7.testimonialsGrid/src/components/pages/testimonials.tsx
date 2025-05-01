import React, { useReducer } from "react";
import Card from "../common/Card.tsx";
import { graduateStatus } from "../../types/graduateStatus";
import { names, headers, captions } from "../../consts/users.ts";
import Checkbox from "../common/Checkbox.tsx";
import { cardsVisibilityContext, cardsVisibilityReducer } from "../../contexts/cardsVisibility.ts";

const Testimonals = () => {
    const [cardsVisibilityState, dispatch] = useReducer(
        cardsVisibilityReducer,
        [true, true, true, true, true]
    );
    return (
      <cardsVisibilityContext.Provider value={{ cardsVisibilityState, dispatch }}>
        <div className="w-9/10 xl:w-17/20 mb-30 mt-10 m-auto">
          <div className="flex flex-col">
            <h1 className="m-auto">Select the checkboxes to view the feedback you'd like to see:</h1>
            <div className="flex gap-5 m-auto mt-2 mb-12">
              {Object.keys(names).map((name, index) => (
                <React.Fragment key={name}>
                  <Checkbox name={names[name]} index={index} />
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:grid-row-6 lg:grid-cols-3 lg:grid-rows-3 xl:grid-cols-4 xl:grid-rows-2 gap-8">
            <div className="row-start-1 col-start-1 md:row-span-2 lg:row-span-1 lg:col-span-2">
              <Card index={0} avatar="/images/image-daniel.jpg" borderColor="purple-300" qutation={true} name={names.daniel} status={graduateStatus.VerifiedGraduated} header={headers.daniel} caption={captions.daniel} bgColor="purple-500" primaryColor="white" secondaryColor="purple-300" />
            </div><div className="lg:col-span-2 xl:col-span-1">
              <Card index={1} avatar="/images/image-jonathan.jpg" borderColor="gray-500" name={names.jonathan} status={graduateStatus.VerifiedGraduated} header={headers.jonathan} caption={captions.jonathan} bgColor="gray-500" primaryColor="white" secondaryColor="white" />
            </div><div>
              <Card index={3} avatar="/images/image-jeanette.jpg" borderColor="white" name={names.jeanette} status={graduateStatus.VerifiedGraduated} header={headers.jeanette} caption={captions.jeanette} bgColor="white" primaryColor="gray-500" secondaryColor="gray-400" />
            </div><div className="md:col-span-2">
              <Card index={4} avatar="/images/image-patrick.jpg" borderColor="purple-500" name={names.patrick} status={graduateStatus.VerifiedGraduated} header={headers.patrick} caption={captions.patrick} bgColor="dark-blue" primaryColor="gray-100" secondaryColor="gray-200" />
            </div><div className="md:row-start-2 md:col-start-2 lg:col-start-3 lg:row-start-1 xl:col-start-4 md:row-span-2">
              <Card index={2} avatar="/images/image-kira.jpg" borderColor="white" name={names.kira} status={graduateStatus.VerifiedGraduated} header={headers.kira} caption={captions.kira} bgColor="white" primaryColor="gray-500" secondaryColor="gray-400" />
            </div>
          </div>
        </div>
      </cardsVisibilityContext.Provider>
    );
}

export default Testimonals;