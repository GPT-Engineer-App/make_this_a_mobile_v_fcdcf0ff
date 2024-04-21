import React, { useState } from "react";
import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td, VStack, HStack, Icon } from "@chakra-ui/react";
import { FaGolfBall, FaTrophy } from "react-icons/fa";
import PlayerNameInput from "./PlayerNameInput";

const Index = () => {
  const [playerNames, setPlayerNames] = useState([""]);
  const [players, setPlayers] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentHole, setCurrentHole] = useState(0);

  const startGame = () => {
    setPlayers(playerNames.map((name) => ({ name, scores: Array(18).fill(0) })));
    setGameStarted(true);
  };

  const handleScoreChange = (playerIndex, holeIndex, score) => {
    const newPlayers = [...players];
    newPlayers[playerIndex].scores[holeIndex] = score === "" ? "" : Number(score);
    setPlayers(newPlayers);
    if (newPlayers.every((player) => player.scores[holeIndex] !== 0)) {
      setCurrentHole((hole) => (hole < 17 ? hole + 1 : hole));
    }
  };

  if (!gameStarted) {
    return (
      <VStack spacing={8} p={5}>
        <Heading as="h1" size="xl" textAlign="center">
          Enter Player Names
        </Heading>
        <PlayerNameInput playerNames={playerNames} setPlayerNames={setPlayerNames} startGame={startGame} />
      </VStack>
    );
  }

  return (
    <VStack spacing={8} p={5}>
      <Heading as="h1" size="xl" textAlign="center">
        Mini Golf Score Card <FaGolfBall />
      </Heading>
      <VStack spacing={4} width="full">
        {players.map((player, index) => (
          <Box key={index} p={2} borderWidth="1px" borderRadius="lg">
            {player.name}
          </Box>
        ))}
      </VStack>
      <VStack width="full" mt={4}>
        <ButtonGroup isAttached variant="outline">
          <Button onClick={() => setCurrentHole(currentHole - 1)} isDisabled={currentHole === 0}>
            Previous Hole
          </Button>
          <Button onClick={() => setCurrentHole(currentHole + 1)} isDisabled={currentHole === 17}>
            Next Hole
          </Button>
        </ButtonGroup>
      </VStack>
      <Box width="full" overflowX="auto" mt={4}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th isNumeric>#</Th>
              {players.map((player, index) => (
                <Th key={index}>{player.name}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td isNumeric fontWeight="bold" color="green.500">{`Hole ${currentHole + 1}`}</Td>
              {players.map((player, playerIndex) => (
                <Td key={playerIndex} isNumeric>
                  <Input type="number" fontWeight="bold" color="green.500" value={player.scores[currentHole] === 0 ? "" : player.scores[currentHole]} onChange={(e) => handleScoreChange(playerIndex, currentHole, e.target.value)} size="sm" max={9} />
                </Td>
              ))}
            </Tr>
            {[...Array(currentHole + 1)].map((_, index) => {
              const holeIndex = currentHole - index;
              return (
                <Tr key={holeIndex}>
                  <Td isNumeric>{`Hole ${holeIndex + 1}`}</Td>
                  {players.map((player, playerIndex) => (
                    <Td key={playerIndex} isNumeric color="gray.500">
                      <Input type="number" color="gray.500" value={player.scores[holeIndex] === 0 ? "" : player.scores[holeIndex]} onChange={(e) => handleScoreChange(playerIndex, holeIndex, e.target.value)} size="sm" max={9} />
                    </Td>
                  ))}
                </Tr>
              );
            })}
            <Tr>
              <Td fontWeight="bold">Total</Td>
              {players.map((player, index) => (
                <Td key={index} isNumeric fontWeight="bold" color="gray.500">
                  {player.scores.reduce((total, score) => total + (score === "" ? 0 : score), 0)}
                </Td>
              ))}
            </Tr>
          </Tbody>
        </Table>
      </Box>
    </VStack>
  );
};

import { Input, Button, ButtonGroup } from "@chakra-ui/react";

export default Index;
