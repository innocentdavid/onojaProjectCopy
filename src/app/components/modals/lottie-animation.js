import React from 'react';
import Lottie from 'lottie-react';

const LottieConf = ({ loopEnable, confirmAnimation }) => {
    return <Lottie loop={loopEnable} autoPlay={true} animationData={confirmAnimation} />;
};

export default LottieConf;