import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';

import { useDetArtistDetailsQuery } from '../redux/services/shazamCore';

const ArtistDetails = () => {
  const { songid, id: artistId } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const {
    data: artistData,
    isFetching: isFetchingArtistDetails,
    error,
  } = useDetArtistDetailsQuery({ artistId });

  // console.log(songData);
  if (isFetchingArtistDetails)
    return <Loader title='Searching Artist details' />;

  if (error) return <Error />;
  return (
    <div className='flex flex-col'>
      <DetailsHeader
        artistId={artistId}
        artistData={artistData}
      ></DetailsHeader>

      <RelatedSongs
        data={Object.values(artistData?.song)}
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
      />
    </div>
  );
};

export default ArtistDetails;
