import React from 'react';
import {
  Container,
  Type,
  IconView,
  TypeText,
  ValueText,
  DescriptionText
} from './styles';
import Icon from 'react-native-vector-icons/Feather';

export default function MovementsList({data}) {
 return (
    <Container>
      <Type>
        <IconView type={data.type}>
          <Icon
            name={data.type === 'despesa' ? 'arrow-down' : 'arrow-up'}
            color="#fff"
            size={20}
          />
          <TypeText>{data.type}</TypeText>
        </IconView>
      </Type>
      <ValueText>
        R$ {data.value}
      </ValueText>
      <DescriptionText>
        {data.description}
      </DescriptionText>
    </Container>
  );
}