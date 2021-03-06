import React from "react";
import PropTypes from "prop-types";
import styled, { css } from 'styled-components';

const opposites = {
   top: "bottom",
   right: "left",
   bottom: "top",
   left: "right"
};

const opposite = ({ position }) => opposites[position];

const perpendicular = ({ position }) =>
   position === "left" || position === "right" ? "top" : "left";

const perpendicularOpposite = props => opposites[perpendicular(props)];

const perpendicularAxis = ({ position }) =>
   position === "left" || position === "right" ? "Y" : "X";

const styles = css`
  position: relative;
  &:before,
  &:after {
    position: absolute;
    pointer-events: none;
    display: block;
    opacity: 0;
    transition: opacity 100ms ease-in-out, ${opposite} 100ms ease-in-out;
    will-change: ${opposite};
  }
  &:hover:before,
  &:focus:before {
    opacity: 1;
    ${opposite}: calc(100% + 1rem);
  }
  &:hover:after,
  &:focus:after {
    opacity: 1;
    ${opposite}: 100%;
  }
  &:before {
    content: attr(tooltipText);
    white-space: nowrap;
    text-transform: none;
    font-size: 0.8125rem;
    line-height: 1.5;
    text-align: center;
    color: white;
    background-color: rgba(0, 0, 0, 0.85);
    border-radius: 0.15384em;
    padding: 0.75em 1em;
    ${opposite}: calc(100% + 2rem);
    ${({ align }) => {
       switch (align) {
          case "start":
             return css`
                ${perpendicular}: 0;
             `;
          case "center":
             return css`
                ${perpendicular}: 50%;
                transform: translate${perpendicularAxis}(-50%);
             `;
          default:
             return css`
                ${perpendicularOpposite}: 0;
             `;
       }
    }}
  }
  &:after {
    ${opposite}: calc(100% + 1rem);
    ${perpendicular}: 50%;
    border: solid transparent;
    content: '';
    height: 0;
    width: 0;
    border-${({ position }) => position}-color: rgba(0, 0, 0, 0.85);
    border-width: 0.5rem;
    margin-${perpendicular}: -0.5rem;
  }
`;

const Tooltip = styled(
   ({ position, align, reverse, children, render, ...props }) => {
      if (render) {
         return React.cloneElement(render, props);
      }
      return React.cloneElement(children, props);
   }
)`
   ${styles};
`;

Tooltip.propTypes = {
   position: PropTypes.oneOf(["top", "right", "bottom", "left"]),
   tooltiptext: PropTypes.string.isRequired,
   align: PropTypes.oneOf(["start", "center", "end"]),
   children: PropTypes.element.isRequired
};

Tooltip.defaultProps = {
   position: "top",
   tooltiptext: "Tooltip text",
   align: "center",
   tabIndex: 0
};

export default Tooltip;
