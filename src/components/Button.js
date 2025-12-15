import styled from 'styled-components';

const StyledButton = styled.button`
  padding: ${props => props.small ? '8px 16px' : '12px 24px'};
  background: ${props => props.className?.includes('bg-') ? 'inherit' : '#d0bb57'};
  color: ${props => props.className?.includes('text-white') ? '#fff' : '#0F1624'};
  border: none;
  border-radius: 5px;
  font-size: ${props => props.small ? '14px' : '16px'};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  width: ${props => props.fullWidth ? '100%' : 'auto'};

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  &:disabled {
    background: #666;
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const Button = ({ children, className, ...props }) => {
    return (
        <StyledButton className={className} {...props}>
            {children}
        </StyledButton>
    );
};

export default Button;
