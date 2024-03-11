export const getDB = () => {
  const sampleDB = {
    // Hardcoded users
    users: [
      {
        id: '7c07b0a6-8183-4670-9f95-1ad1a743c24c',
        login: 'Scatman',
        password: 'Ski-Ba-Bop-Ba-Dop-Bop',
        version: 1,
        createdAt: 1709609925551,
        updatedAt: 1709609925551,
      },
      {
        id: '6dc03fac-4d1f-422e-b734-53b156a9989a',
        login: 'Voldemort',
        password: '7horcrux',
        version: 1,
        createdAt: 1694489611620,
        updatedAt: 1694489611620,
      },
      {
        id: '176cd1b3-e3ba-4add-b112-7d4fbc57a927',
        login: 'Saul Goodman',
        password: 'HH&McGill',
        version: 1,
        createdAt: 1709435798809,
        updatedAt: 1709435798809,
      },
    ],
    // Hardcoded tracks
    tracks: [
      {
        id: '1553903b-f73e-40a0-a91a-2ab344d0a493',
        name: 'Where Is the Love?',
        artistId: null,
        albumId: null,
        duration: 274,
      },
      {
        id: '1ce5b39e-1c0f-4759-b3b7-38b34a8744c8',
        name: 'Bohemian Rhapsody',
        artistId: '2a36e3fa-aec4-481c-9912-815b6d69e175',
        albumId: '9ccadffb-2834-49e7-b99a-eae961903040',
        duration: 355,
      },
      {
        id: '952158c3-0966-43ef-bfdc-0c6b3ae5adf9',
        name: 'Creep',
        artistId: 'c4874e51-cdac-4662-a19b-ca5d1a4c9d43',
        albumId: null,
        duration: 236,
      },
    ],
    // Hardcoded tracks
    artists: [
      {
        id: '2a36e3fa-aec4-481c-9912-815b6d69e175',
        name: 'Queen',
        grammy: true,
      },
      {
        id: 'c4874e51-cdac-4662-a19b-ca5d1a4c9d43',
        name: 'Radiohead',
        grammy: true,
      },
      {
        id: '42487d12-bf93-41f2-8c0f-caf2c6e30275',
        name: 'Ludovico Einaudi',
        grammy: false,
      },
    ],
    // Hardcoded tracks
    albums: [
      {
        id: '9ccadffb-2834-49e7-b99a-eae961903040',
        name: 'Greatest Hits',
        year: 1981,
        artistId: '2a36e3fa-aec4-481c-9912-815b6d69e175',
      },
      {
        id: '7c140bb7-a3ea-4c47-901c-785fd902c359',
        name: 'OK Computer',
        year: 1997,
        artistId: 'c4874e51-cdac-4662-a19b-ca5d1a4c9d43',
      },
      {
        id: '57abd0ff-3103-49b5-95f6-0769c208928c',
        name: 'Seven Days Walking: Day One',
        year: 2019,
        artistId: '42487d12-bf93-41f2-8c0f-caf2c6e30275',
      },
    ],
    // favorites
    favs: {
      artists: [],
      albums: [],
      tracks: [],
    },
  };

  return sampleDB;
};
