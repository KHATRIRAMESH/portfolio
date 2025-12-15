import styled from 'styled-components';

const StyledLabel = styled.label`
  display: block;
  font-size: ${props => props.className?.includes('text-lg') ? '1.125rem' : '0.875rem'};
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: inherit;
`;

export const Label = ({ children, className, ...props }) => {
    return (
        <StyledLabel className={className} {...props}>
            {children}
        </StyledLabel>
    );
};
