import React, { useEffect } from "react";
import { Map } from "leaflet";

const useRefEffect = ({
  effect,
  ref,
}: {
  effect: (leafletElement: Map | undefined) => void;
  ref: React.MutableRefObject<undefined>;
}) => {
  useEffect(() => {
    effect(ref!.current);
  }, [effect, ref]);
};

export default useRefEffect;
