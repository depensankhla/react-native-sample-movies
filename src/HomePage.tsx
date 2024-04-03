import React, { useState, useEffect } from 'react';
import translate from 'translate-google-api';
import { useSelector } from 'react-redux';
import { View, Text, FlatList, Image, StyleSheet, Dimensions } from 'react-native';
import { extractTitles, updateTitles } from './utils/MovieService';
import { MovieDetails, MovieItemDetails, State } from './type/Movies.type';

const { width } = Dimensions.get('window');

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const selectedLanguage = useSelector((state:State) => state?.loginDetails?.language);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          'https://api.themoviedb.org/3/movie/popular?api_key=b836aab3bd57fb6dff4b046cce00391b'
        );
        const data = await response.json();
        if (selectedLanguage === 'ar') {
          let titleArray = extractTitles(data.results);
          const movieTitleResult = await translate(titleArray, {
            tld: "com",
            to: "ar",
          });
          updateTitles(data, movieTitleResult)
        }
        setMovies(data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
    fetchMovies();
  }, []);

  const renderMovieItem = ({ item }: MovieItemDetails) => {
    return (
      <View style={styles.itemContainer}>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}` }}
          style={styles.poster}
        />
        <Text style={styles.title}>{item.title}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        renderItem={renderMovieItem}
        keyExtractor={(item: MovieDetails) => item.id.toString()}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
  itemContainer: {
    width: width / 2,
    padding: 10,
  },
  poster: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  title: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomePage;
