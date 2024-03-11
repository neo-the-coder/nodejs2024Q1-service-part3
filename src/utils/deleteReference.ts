import { myDB } from 'src/main';

export const deleteReference = (
  deletedEntityType: string,
  deletedId: string,
) => {
  // Remove reference from favorites
  myDB.favs[deletedEntityType] = myDB.favs[deletedEntityType].filter(
    (item) => item.id !== deletedId,
  );

  switch (deletedEntityType) {
    case 'artists':
      for (const entityType of ['tracks', 'albums']) {
        myDB[entityType].forEach((item) => {
          if (item.artistId === deletedId) item.artistId = null;
        });
      }
      break;
    case 'albums':
      myDB.tracks.forEach((item) => {
        if (item.albumId === deletedId) item.albumId = null;
      });
      break;
  }
};
