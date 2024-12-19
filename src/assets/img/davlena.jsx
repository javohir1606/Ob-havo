import React from "react";

export const DavlenaIcon = () => {
  return (
    <svg
      width={19}
      height={19}
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_22352_5)">
        <circle cx={10} cy={9} r={19} fill="white" />
      </g>
      <path
        d="M10.1345 0.281303C9.81729 -0.0359516 9.34139 -0.115293 8.94479 0.201998C8.94479 0.201998 8.86549 0.201998 8.86549 0.281303C8.23094 1.07446 2.3615 8.21295 2.3615 11.8615C2.3615 15.8274 5.53416 19 9.5 19C13.4658 19 16.6385 15.8274 16.6385 11.8615C16.6385 8.21295 10.7691 1.07446 10.1345 0.281303Z"
        fill="url(#paint0_linear_22352_5)"
      />
      <defs>
        <filter
          id="filter0_d_22352_5"
          x={-17}
          y={-15}
          width={56}
          height={56}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology
            radius={1}
            operator="erode"
            in="SourceAlpha"
            result="effect1_dropShadow_22352_5"
          />
          <feOffset dx={1} dy={4} />
          <feGaussianBlur stdDeviation={5} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.278431 0 0 0 0 0.576471 0 0 0 0 1 0 0 0 0.2 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_22352_5"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_22352_5"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_22352_5"
          x1="3.90805"
          y1="16.383"
          x2="15.0729"
          y2="5.22218"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#34CDFA" />
          <stop offset={1} stopColor="#E8D9F1" />
        </linearGradient>
      </defs>
    </svg>
  );
};
