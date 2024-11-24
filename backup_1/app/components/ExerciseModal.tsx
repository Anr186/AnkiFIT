import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Image} from 'react-native';
import { Exercise } from '../types';

interface ExerciseModalProps {
  visible: boolean;
  exercise: Exercise | null;
  onClose: () => void;
  render_image: number;
}
const image2 = {
  uri: "https://raw.githubusercontent.com/Anr186/AnkiFIT_Source/56706f3bd04e18c3821f7e589129defb6fa39c66/image/Splash.svg",
};
export const ExerciseModal = ({ visible, exercise, onClose, render_image }: ExerciseModalProps) => (
  <Modal
    animationType="slide"
    transparent={true}
    visible={visible}
    onRequestClose={onClose}
  >
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>{exercise?.title}</Text>
        
        <Text style={styles.modalDescription}>{exercise?.description}</Text>
        if (render_image == 2) {
            <Image source={image2} className="flex-1 justify-center items-center"></Image>
          }
        <TouchableOpacity
          style={styles.modalButton}
          onPress={onClose}
        >
          
          <Text style={styles.modalButtonText}>Закрыть</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  modalDescription: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});