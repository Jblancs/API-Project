'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

options.tableName = 'SpotImages';

// Seeder helper functions ------------------------------
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min)
}


const seedImage = () => {
  const upArray = []

  const prevImgArray = [
    'https://wpcdn.us-midwest-1.vip.tn-cloud.net/www.coloradohomesmag.com/content/uploads/data-import/44b1af42/exterior_This-Spacious-Modern-Farmhouse-is-a-Forever-Home.jpg',
    'https://www.coloradohomesmag.com/content/uploads/data-import/05c178fc/backyardThis-Spacious2C-Modern-Farmhouse-is-a-Forever-Home.jpg',
    'https://i.pinimg.com/originals/f2/70/62/f27062bfb3ac6c17520d7a347d50e22d.jpg',
    'https://www.compass.com/m/bf041c8bc987ac0191135d6d6f9e5963210b622b_img_0_b0b79/origin.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMWivLTpSpMx9tkOWh4EpcCwdWr0UqCyKDytodO-Z0cts--E08_5MszE13SGlmTGwHr8w&usqp=CAU',
    'https://d287g3eda0fymb.cloudfront.net/FarmhouseFreshCOVER-fit=constrain&wid=2560&hei=1440.jpg',
    'https://caliber.co/wp-content/uploads/1036-S-Columbine-Street-Denver-Exterior-1600x1067-1-1024x683.jpg',
    'https://www.compass.com/m/54ad2160e50a231ea343d2b2398f72ce8d5e28a4_img_0/origin.jpg',
    'https://photos.zillowstatic.com/fp/ac806b49c7c0c44de967125feaabf024-cc_ft_1536.jpg',
    'https://3.bp.blogspot.com/-MRRrTPBQzpc/XEJqfOg6NVI/AAAAAAAAC0E/xggJt6mEKUESR_iwQeqodf2aTwOWdGkTQCK4BGAYYCw/s1600/madison.jpeg',
    'https://workshop-colorado.com/wp-content/uploads/2021/04/1655WinonaCourtListingStylePhotos-02-960x720.jpg',
    'https://i.pinimg.com/736x/92/02/cf/9202cfa28f5cebdd04cfdb194d59c14c.jpg',
    'https://co.reel-scout.com/up_images/2/4526162.jpg?4/4/2023%206:54:31%20PM',
    'https://thehavenlist.com/wp-content/uploads/2020/08/alvarezmorris-caliberconstruction-home-exterior-inspiration-2.jpg',
    'https://www.homebuilderdigest.com/wp-content/uploads/2019/03/CHB-Denver-15.jpg',
    'https://st.hzcdn.com/simgs/3e81fd7802cf2414_4-5012/home-design.jpg',
    'https://www.denverpost.com/wp-content/uploads/2023/05/AdobeStock_290305447.jpeg?w=525',
    'https://caliber.co/wp-content/uploads/792-S-High-St-Denver-Exterior-1600x1067-1-1024x683.jpg',
    'https://images.zerodown.com/cloudfront//8ff91383/b6445d23a27b069b99a8c64414fed864/83dcefb7.jpeg?tr=f-auto,w-640,h-360',
    'https://www.trulia.com/pictures/thumbs_4/zillowstatic/fp/21cc56da31cc2af9d245d1d0f45f4ebf-full.jpg'
  ]

  for(let i = 0; i < prevImgArray.length; i++){
    let prevImg = {
      spotId: i+1,
      url: prevImgArray[i],
      preview: true
    }
    upArray.push(prevImg)
  }

  const livingArray = [
    'https://www.coloradohomesmag.com/content/uploads/2021/01/living-room2c-entrepreneur-laura-lovee28099s-denver-home2c-hentschel-designs2c-colorado-homes-and-lifestyles-magazine.jpg',
    'https://www.decorilla.com/online-decorating/wp-content/uploads/2018/08/top-denver-interior-designers.jpg',
    'https://d287g3eda0fymb.cloudfront.net/FarmhouseFresh2-fit=constrain&wid=2560&hei=1440.jpg',
    'https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_850,h_607/https://www.essentialhome.eu/inspirations/wp-content/uploads/2021/01/Meet-The-20-Best-Interior-Designers-In-Denver-You%E2%80%99ll-Love_6.jpg',
    'https://www.essentialhome.eu/inspirations/wp-content/uploads/2021/01/Meet-The-20-Best-Interior-Designers-In-Denver-You%E2%80%99ll-Love.png',
    'https://brabbu.com/blog/wp-content/uploads/2021/01/Denver-Interior-Designers-a-Top-20-to-inspire-marble-designs_9-1.jpg'
  ]

  const kitchenArray = [
    'https://www.jmwoodworks.com/wp-content/uploads/1614SCoronaStreet_JM_JessBlackwellPhotography_04-1024x683.jpg',
    'https://www.coloradohomesmag.com/content/uploads/data-import/05c178fc/4This-Denver-Kitchen-is-Transitional-in-More-Ways-Than-One2C-William-Ohs2C-Colorado-Homes-and-Lifestylles-magazine.jpg',
    'https://www.jmwoodworks.com/wp-content/uploads/Monaco-Kitchen-painted-gallery-tim-min-1024x669.jpg',
    'https://i.pinimg.com/736x/7a/6e/57/7a6e5746f84b07cfb4df33c60f025c99--gray-kitchen-walls-gray-kitchens.jpg',
    'https://i.pinimg.com/originals/39/e7/b2/39e7b214c40abca27eeea6f957e1518c.jpg',
    'https://cdn.decorpad.com/photos/2016/02/12/white-kitchen-2-gray-center-islands-wingback-tufted-counter-stools.jpg'
  ]

  const bedroomArray = [
    'https://images.squarespace-cdn.com/content/v1/5babb7da3560c33e41557613/1589217580758-WDPZISML9R0BUEOQGIU6/HistoricDenverRemodel-Dialect-27.jpg?format=2500w',
    'https://margaritabravo.com/wp-content/uploads/2019/09/castle-pines-village-bedroom-interior-design.jpg',
    'https://www.coloradohomesmag.com/content/uploads/2020/10/Screen-Shot-2020-05-22-at-11.36.28-AM.jpg',
    'https://www.coloradohomesmag.com/content/uploads/2021/11/q/q/2020-10-14-davidmarlow-mcguire-320-bleeker-interiors-0077-jmd-2048x1342-1.jpeg',
    'https://www.coloradohomesmag.com/content/uploads/data-import/05c178fc/Bed-2.jpg',
    'https://www.coloradohomesmag.com/content/uploads/2020/04/EMR_4754.jpg'
  ]

  const bathroomArray = [
    'https://margaritabravo.com/wp-content/uploads/2018/09/designing-luxurious-master-bathroom-interior.jpg',
    'https://st.hzcdn.com/simgs/pictures/bathrooms/denver-colorado-residence-loft-style-master-bath-robeson-design-img~0231fb8e0a675cb3_4-8390-1-7735931.jpg',
    'https://margaritabravo.com/wp-content/uploads/2019/10/denver-showhouse-luxe-master-bath-interior-design.jpg',
    'https://st.hzcdn.com/simgs/pictures/bathrooms/sleek-and-inviting-modern-luxury-six-walls-interior-design-img~73d1c2f20c19d237_4-2280-1-0978754.jpg',
    'https://images.adsttc.com/media/images/5948/b488/b22e/3867/0600/07bb/large_jpg/008_Interior_6145.jpg?1497937014',
    'https://cdn.newswire.com/files/x/63/b5/aab4cabf19d14b506785522e50e6.jpg'
  ]

  for(let i = 1; i < 21; i++){
    const img1 = {
      spotId: i,
      url: livingArray[getRandomInt(0,6)],
      preview: false
    }
    const img2 = {
      spotId: i,
      url: kitchenArray[getRandomInt(0,6)],
      preview: false
    }
    const img3 = {
      spotId: i,
      url: bedroomArray[getRandomInt(0,6)],
      preview: false
    }
    const img4 = {
      spotId: i,
      url: bathroomArray[getRandomInt(0,6)],
      preview: false
    }
    upArray.push(img1, img2, img3, img4)
  }

  return upArray
}

const seedImageUndo = () => {
  let downArray = []
  for(let i = 1; i < 21; i++){
    downArray.push(i)
  }
  return downArray
}

// Seeder -----------------------------------------------
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(options, seedImage()
      // [
      //   {
      //     spotId: 1,
      //     url: 'https://images.pexels.com/photos/259950/pexels-photo-259950.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      //     preview: true
      //   },
      //   {
      //     spotId: 2,
      //     url: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      //     preview: true
      //   },
      //   {
      //     spotId: 3,
      //     url: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      //     preview: true
      //   },
      //   {
      //     spotId: 4,
      //     url: 'https://images.pexels.com/photos/206172/pexels-photo-206172.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      //     preview: true
      //   },
      //   {
      //     spotId: 5,
      //     url: 'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      //     preview: true
      //   },
      //   {
      //     spotId: 6,
      //     url: 'https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg',
      //     preview: true
      //   },
      //   {
      //     spotId: 1,
      //     url: 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      //     preview: false
      //   },
      //   {
      //     spotId: 2,
      //     url: 'https://images.pexels.com/photos/276554/pexels-photo-276554.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      //     preview: false
      //   },
      //   {
      //     spotId: 3,
      //     url: 'https://images.pexels.com/photos/2988860/pexels-photo-2988860.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      //     preview: false
      //   },
      //   {
      //     spotId: 4,
      //     url: 'https://images.pexels.com/photos/280232/pexels-photo-280232.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      //     preview: false
      //   },
      //   {
      //     spotId: 5,
      //     url: 'https://images.pexels.com/photos/3554424/pexels-photo-3554424.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      //     preview: false
      //   },
      //   {
      //     spotId: 6,
      //     url: 'https://images.pexels.com/photos/2440471/pexels-photo-2440471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      //     preview: false
      //   },
      //   {
      //     spotId: 7,
      //     url: 'https://www.bhg.com/thmb/0Fg0imFSA6HVZMS2DFWPvjbYDoQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg',
      //     preview: true
      //   },
      //   {
      //     spotId: 7,
      //     url: 'https://media.architecturaldigest.com/photos/571e97ce818277135ff91620/master/w_2626,h_1821,c_limit/modernist-decor-inspiration-07.jpg',
      //     preview: false
      //   }
      // ]
      , {});
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: seedImageUndo() }
    }, {});
  }
};
