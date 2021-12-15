import React, { FC } from "react";
import styled from "@emotion/styled"
import { Typography, TypographyProps } from "@mui/material";
import { CloseRounded } from "@mui/icons-material";
import { WithMuiTheme, borders, spacings, layouts } from "@reachout/mui-style"

const Container = styled.div<WithMuiTheme>`
  background-color: ${props => props.theme.palette.primary.main};
  border-radius ${borders.radii.large};
  padding: ${spacings.sizes.jumbo};
`;

const HeadingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SubHeadingContainer = styled.div`
  margin-bottom: ${spacings.sizes.xl};
`;

const CtaContainer = styled.div`
  ${layouts.deadCenter}

  * + * {
    margin-left: ${spacings.sizes.sm};
  }
`;

const CIText: FC<TypographyProps> = ({ children, ...others }) =>
  <Typography color="white" {...others}>{children}</Typography>


const Cta: FC = ({ children }) => {
  const Container = styled.div`
      border-radius: ${borders.radii.base};
      padding: ${spacings.sizes.lg};
      border: 1px solid white;
    `;

  return (
    <Container>
      <CIText>{children}</CIText>
    </Container>
  )
};

const CheckIn: FC = () => {
  return (
    <Container>
      <HeadingContainer>
        <CIText variant="h5">Daily check in</CIText>
        <CloseRounded sx={{ color: "white" }} />
      </HeadingContainer>

      <SubHeadingContainer>
        <CIText>It's good to see you here. How are you feeling today?</CIText>
      </SubHeadingContainer>

      <CtaContainer>
        <Cta>Things are Good</Cta>
        <Cta>It's bad, but I'm ok</Cta>
        <Cta>It's a lot to handle</Cta>
      </CtaContainer>
    </Container>
  );
};

export default CheckIn;
