import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import { createIconSetFromIcoMoon } from '@expo/vector-icons';
import { Icon } from 'galio-framework';

import GalioConfig from '../assets/fonts/galioExtra';

const GalioExtra = require('../assets/fonts/galioExtra.ttf');
const IconGalioExtra = createIconSetFromIcoMoon(GalioConfig, 'GalioExtra');

export default function IconExtra({ name, family, ...rest }) {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({ GalioExtra: GalioExtra });
      setFontLoaded(true);
    }
    loadFont();
  }, []);

  if (name && family && fontLoaded) {
    if (family === 'GalioExtra') {
      return <IconGalioExtra name={name} family={family} {...rest} />;
    }
    return <Icon name={name} family={family} {...rest} />;
  }

  return null;
}