import React from "react";
import { useSnapshot } from "valtio";
import { useGLTF, useTexture, Decal } from "@react-three/drei";
import state from "../store/index";

const Shirt = () => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF("/shirt_baked.glb");

  const logoTexture = useTexture(snap.logoDecal);

  if (materials.lambert1) {
    materials.lambert1.color.set(snap.color); // تنظیم رنگ پیراهن
    materials.lambert1.transparent = false;
    materials.lambert1.opacity = 1;
    materials.lambert1.map = null; // حذف تکسچرهای اضافی
    materials.lambert1.normalMap = null;
    materials.lambert1.aoMap = null;
    materials.lambert1.needsUpdate = true;
  }

  return (
    <group>
      <mesh
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        material-roughness={1}
        dispose={null}
      >
        {/* اضافه کردن لوگو فقط اگر فعال باشد */}
        {snap.isLogoTexture && (
          <Decal
            position={[0, 0.04, 0.15]} // محل قرارگیری لوگو روی سینه
            rotation={[0, 0, 0]}
            scale={0.15} // اندازه لوگو
            map={logoTexture}
            mapAnisotropy={16}
            depthTest={false}
            depthWrite={true}
          />
        )}
      </mesh>
    </group>
  );
};

export default Shirt;
