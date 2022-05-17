import React from 'react';
import {
  Typography,
  Container,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import { useParams } from 'react-router';
import axios from 'axios';
import { Async } from 'react-async';

export default function FreeBoard() {
  let params = useParams();

  async function getBoard() {
    let res = await axios.get(`http://localhost:4000/post/${params.boardid}`);
    let boardPostData = res.data.data;
    return boardPostData;
  }

  return (
    <>
      <Container sx={{ textAlign: 'center' }}>
        <Async promiseFn={getBoard}>
          {({ data, error, isPending }) => {
            if (isPending)
              return (
                <>
                  <Typography m='100px'>Loding....</Typography>
                </>
              );
            if (error) return `Something went wrong: ${error.message}`;
            const tableHeadStyle = {
              fontWeight: '700',
              fontSize: '1rem',
            };
            return (
              <>
                <Typography
                  variant='h2'
                  m='80px 0 10px 0'
                  fontSize='4.5rem'
                  // fontFamily='Copperplate'
                  // fontFamily='Papyrus'
                  // fontFamily='Lucida Handwriting'
                  // fontFamily='Monaco'
                  // fontFamily='cursive'
                  // fontFamily='fantasy'
                  // fontFamily='Tahoma'
                  fontFamily='Teko'
                  // fontFamily='Play'
                  // fontFamily='Great Vibes'
                  // fontFamily='Tapestry'
                >
                  {data[0].boards_id.title}
                </Typography>
                <Typography
                  variant='subtitle1'
                  mb='100px'
                  fontFamily='Nanum Gothic'
                >
                  {data[0].boards_id.subtitle}
                </Typography>
                <TableContainer>
                  <Table sx={{ fontFamily: 'Nanum Gothic Coding' }}>
                    <TableHead>
                      <TableRow>
                        <TableCell align='center' style={tableHeadStyle}>
                          제목
                        </TableCell>
                        <TableCell align='center' style={tableHeadStyle}>
                          작성자
                        </TableCell>
                        <TableCell align='center' style={tableHeadStyle}>
                          작성일
                        </TableCell>
                        <TableCell align='center' style={tableHeadStyle}>
                          추천수
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    {data.map((postData: any, index: number) => {
                      return (
                        <>
                          <TableBody>
                            <TableRow>
                              <TableCell
                                scope='row'
                                sx={{
                                  fontWeight: '550',
                                  color: '#333',
                                  '&:hover': {
                                    cursor: 'pointer',
                                    color: 'lightBlue',
                                    transition: 'color .2s',
                                  },
                                }}
                              >
                                {postData.title}
                              </TableCell>
                              <TableCell align='center'>
                                {postData.username}
                              </TableCell>
                              <TableCell align='center'>
                                {/* 이건 시간까지 {postData.createdAt.slice(0, 16)} */}
                                {postData.createdAt.slice(0, 10)}
                              </TableCell>
                              <TableCell align='center'>
                                {postData.likes.length}
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </>
                      );
                    })}
                  </Table>
                </TableContainer>
              </>
            );
          }}
        </Async>
      </Container>
    </>
  );
}