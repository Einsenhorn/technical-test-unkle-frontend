import React, { useRef, useEffect, useState, ReactNode, RefObject } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

export enum ToolTipPosition {
    Top = 1,
    Bottom = 2,
    Left = 3,
    Right = 4,
}

export interface CSSPosition {
    top: string | number;
    left: string | number;
}

export interface TooltipProps {
    children: ReactNode;
    anchorRef: RefObject<HTMLElement>;
    position?: ToolTipPosition;
    onClickOutside?: (event: any) => void;
}

const TooltipContainer = styled.div`
    position: fixed;
    background-color: white;
    border: 1px solid #cccccc;
    border-radius: 0.3rem;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
`;

export const Tooltip: React.FC<TooltipProps> = ({
    children,
    anchorRef,
    position = ToolTipPosition.Left,
    onClickOutside = () => undefined,
}) => {
    const tooltipRef = useRef(null);
    const [container, setTooltipContainer] = useState<HTMLDivElement>();
    const [containerPosition, setContainerPosition] = useState<CSSPosition>({ left: 0, top: 0 });

    // Set ToolTipContainer
    useEffect(() => {
        const parentDocument = anchorRef.current?.ownerDocument;
        if (!parentDocument) {
            return;
        }

        let ctn = parentDocument.querySelector<HTMLDivElement>('#tooltips');
        if (!ctn) {
            ctn = document.createElement('div');
            ctn.id = 'tooltips';
            parentDocument.body.appendChild(ctn);
        }

        setTooltipContainer(ctn);
    }, [anchorRef.current?.ownerDocument]);

    // Set Position of the tooltip based on the anchor position
    useEffect(() => {
        const anchor = anchorRef.current;
        const tooltip = tooltipRef.current;

        if (!anchor || !tooltip) {
            return;
        }

        const anchorCR = anchor.getBoundingClientRect();
        const tooltipCR = tooltip.getBoundingClientRect();

        const ctnPosition: CSSPosition = {
            left:
                position === ToolTipPosition.Left
                    ? anchorCR.x - tooltipCR.width - 10
                    : position === ToolTipPosition.Right
                    ? anchorCR.x + anchorCR.width + 10
                    : anchorCR.x + anchorCR.width / 2 - tooltipCR.width / 2,
            top:
                position === ToolTipPosition.Top
                    ? anchorCR.y - tooltipCR.height - 10
                    : position === ToolTipPosition.Bottom
                    ? anchorCR.y + anchorCR.height + 10
                    : anchorCR.y + anchorCR.height / 2 - tooltipCR.height / 2,
        };

        setContainerPosition(ctnPosition);
    }, [anchorRef.current, tooltipRef.current, position, container]);

    // When a click is emitted and the tooltip won't receive this event we want to hide the tooltip
    useEffect(() => {
        const listener = (event: any) => {
            if (!tooltipRef.current || tooltipRef.current.contains(event.target)) {
                return;
            }

            onClickOutside(event);
        };

        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);

        return () => {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
        };
    }, [tooltipRef.current, onClickOutside]);

    return container
        ? createPortal(
              <TooltipContainer ref={tooltipRef} style={containerPosition}>
                  {children}
              </TooltipContainer>,
              container,
          )
        : null;
};
