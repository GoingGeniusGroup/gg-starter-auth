import { useFrame, useThree } from "@react-three/fiber";
import { FC, useEffect, useRef } from "react";
import { clamp, lerp } from "@/services/avatar/index";
import { Camera, Object3D, Vector3 } from "three";
import { OrbitControls } from "three-stdlib";

type CameraControlsProps = {
  cameraTarget?: number;
  cameraInitialDistance?: number;
  cameraZoomTarget?: Vector3;
  controlsMinDistance?: number;
  controlsMaxDistance?: number;
  updateCameraTargetOnZoom?: boolean;
  modelRef?: React.RefObject<Object3D>;
  followModel?: boolean;
};

const updateCameraFocus = (
  camera: Camera,
  delta: number,
  target: Vector3 | undefined,
  progressRef: { current: number }
) => {
  if (target && progressRef.current <= 1) {
    camera.position.setX(
      lerp(camera.position.x, target.x, progressRef.current)
    );
    camera.position.setZ(
      lerp(camera.position.z, target.z, progressRef.current)
    );
    progressRef.current += delta;
  }
};

const updateCameraTarget = (
  controls: OrbitControls,
  camera: Camera,
  target: number,
  minDistance: number,
  maxDistance: number
) => {
  const distance = clamp(
    controls.target.distanceTo(camera.position),
    maxDistance,
    minDistance
  );
  const pivot = (distance - minDistance) / (maxDistance - minDistance);
  controls.target.set(0, target - 0.6 * pivot, 0);
};

export const CameraControls: FC<CameraControlsProps> = ({
  cameraTarget,
  cameraInitialDistance,
  cameraZoomTarget,
  controlsMinDistance = 0.4,
  controlsMaxDistance = 2.5,
  updateCameraTargetOnZoom = false,
  followModel = false,
  modelRef,
}) => {
  const { camera, gl } = useThree();
  const controlsRef = useRef<OrbitControls | null>(null);
  const progressRef = useRef(Number.POSITIVE_INFINITY);
  const cameraZoomTargetRef = useRef(cameraZoomTarget);
  const fallbackCameraTarget = cameraTarget || 1.475;

  useEffect(() => {
    // Handle camera zoom target updates
    if (
      cameraZoomTargetRef.current?.x !== cameraZoomTarget?.x ||
      cameraZoomTargetRef.current?.y !== cameraZoomTarget?.y ||
      cameraZoomTargetRef.current?.z !== cameraZoomTarget?.z
    ) {
      cameraZoomTargetRef.current = cameraZoomTarget;
      progressRef.current = 0;
    }

    // Initialize controls
    const controls = new OrbitControls(camera, gl.domElement);
    controlsRef.current = controls;

    // Configure controls
    controls.enableRotate = true;
    controls.enablePan = false;
    controls.minDistance = controlsMinDistance;
    controls.maxDistance = controlsMaxDistance;
    controls.minPolarAngle = 1.4;
    controls.maxPolarAngle = 1.4;
    controls.target.set(0, fallbackCameraTarget, 0);

    // Set initial camera position if specified
    if (
      cameraInitialDistance &&
      progressRef.current === Number.POSITIVE_INFINITY
    ) {
      camera.position.z = cameraInitialDistance;
    }

    controls.update();

    return () => {
      controls.dispose();
      controlsRef.current = null;
    };
  }, [
    camera,
    gl.domElement,
    cameraInitialDistance,
    controlsMinDistance,
    controlsMaxDistance,
    fallbackCameraTarget,
    cameraZoomTarget,
  ]);

  useFrame((_, delta) => {
    const controls = controlsRef.current;
    if (!controls) return;

    if (followModel && modelRef?.current) {
      controls.target.copy(modelRef.current.position);
    } else if (updateCameraTargetOnZoom) {
      updateCameraTarget(
        controls,
        camera,
        fallbackCameraTarget,
        controlsMinDistance,
        controlsMaxDistance
      );
    }

    updateCameraFocus(camera, delta, cameraZoomTarget, progressRef);
    controls.update();
  });

  return null;
};
