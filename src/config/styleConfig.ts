
interface StyleInfo {
  image: string;
  guideImage: string;
  description: string;
}

interface StyleConfig {
  [key: string]: StyleInfo;
}

export const styleConfig: StyleConfig = {
  'Natural': {
    image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071344/GUIA_NATURAL_fzp6fc.webp',
    guideImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071347/MOCKUP_TABLETE_-_GUIA_DE_IMAGEM_E_ESTILO_ncctzi.webp',
    description: 'Você valoriza o conforto e a praticidade. Seu estilo é descontraído e casual, com peças fáceis de usar no dia a dia.'
  },
  'Clássico': {
    image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071343/GUIA_CL%C3%81SSICO_ux1yhf.webp',
    guideImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071347/MOCKUP_TABLETE_-_GUIA_DE_IMAGEM_E_ESTILO_ncctzi.webp',
    description: 'Você valoriza o equilíbrio e a tradição. Seu estilo é elegante e atemporal, com peças que não saem de moda.'
  },
  'Contemporâneo': {
    image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071343/GUIA_CONTEMPOR%C3%82NEO_vcklxe.webp',
    guideImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071347/MOCKUP_TABLETE_-_GUIA_DE_IMAGEM_E_ESTILO_ncctzi.webp',
    description: 'Você valoriza o equilíbrio entre moda e praticidade. Seu estilo é atual e adaptativo, com peças que transitam bem entre várias ocasiões.'
  },
  'Elegante': {
    image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071342/GUIA_ELEGANTE_asez1q.webp',
    guideImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071347/MOCKUP_TABLETE_-_GUIA_DE_IMAGEM_E_ESTILO_ncctzi.webp',
    description: 'Você valoriza a sofisticação e o requinte. Seu estilo é refinado e imponente, com peças que exalam qualidade e status.'
  },
  'Romântico': {
    image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071343/GUIA_ROM%C3%82NTICO_ci4hgk.webp',
    guideImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071347/MOCKUP_TABLETE_-_GUIA_DE_IMAGEM_E_ESTILO_ncctzi.webp',
    description: 'Você valoriza a delicadeza e a feminilidade. Seu estilo é suave e gracioso, com peças que transmitem leveza e romantismo.'
  },
  'Sexy': {
    image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071349/GUIA_SEXY_t5x2ov.webp',
    guideImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071347/MOCKUP_TABLETE_-_GUIA_DE_IMAGEM_E_ESTILO_ncctzi.webp',
    description: 'Você valoriza a sensualidade e a expressão corporal. Seu estilo é provocante e ousado, com peças que destacam suas curvas.'
  },
  'Dramático': {
    image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745073346/GUIA_DRAM%C3%81TICO_mpn60d.webp',
    guideImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071347/MOCKUP_TABLETE_-_GUIA_DE_IMAGEM_E_ESTILO_ncctzi.webp',
    description: 'Você valoriza o impacto visual e a originalidade. Seu estilo é marcante e poderoso, com peças estruturadas e de design diferenciado.'
  },
  'Criativo': {
    image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071342/GUIA_CRIATIVO_ntbzph.webp',
    guideImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071347/MOCKUP_TABLETE_-_GUIA_DE_IMAGEM_E_ESTILO_ncctzi.webp',
    description: 'Você valoriza a expressão artística e a liberdade. Seu estilo é único e eclético, com peças que refletem sua personalidade multifacetada.'
  }
};
